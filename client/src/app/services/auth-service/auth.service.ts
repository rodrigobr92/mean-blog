import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface AuthData {
  email: string;
  username?: string;
  password: string;
}

export interface User {
  email: string;
  username: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string | null;
  private tokenTimer: any;
  private user?: User;
  private authStatusListener = new Subject<boolean>();
  private apiUrl = 'http://localhost:3333/api/user';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    if (this.user && this.user.userId) {
      return this.user.userId;
    }
    return undefined;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(e: {
    email: string;
    username: string;
    password: string;
  }) {
    const authData: AuthData = {
      email: e.email,
      username: e.username,
      password: e.password,
    };
    this.http
      .post(this.apiUrl + '/signup', authData)
      .subscribe((response: any) => {
        console.log(response);
        this.login(e.email, e.password);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        user: User;
      }>(this.apiUrl + '/login', authData)
      .subscribe((response) => {
        this.user = response.user;
        console.log(this.user);
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000,
          );
          this.saveAuthData(
            this.token,
            expirationDate,
            this.user,
          );
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn =
      authInformation.expirationDate.getTime() -
      now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.user = undefined;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    user: User,
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem(
      'expiration',
      expirationDate.toISOString(),
    );
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const expirationDate =
      localStorage.getItem('expiration');
    if (!token || !expirationDate || !user) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user: JSON.parse(user),
    };
  }
}
