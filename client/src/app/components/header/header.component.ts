import { AuthComponent } from './../auth/auth.component';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, RouterLink, AuthComponent],
  template: `
    <header class="main-header">
      <h1 class="app-title">Blog</h1>
      <h2 class="page-title"
        ><a routerLink="/">{{ pageTitle }}</a></h2
      >
      @if (isAuth) {
        <p-button
          class="header-btn"
          (click)="logout()"
          >Logout</p-button
        >
        <p-button
          class="header-btn"
          (click)="openAdminPage()"
          >Admin</p-button
        >
      } @else {
        <p-button
          class="header-btn"
          (click)="showAuthModal()"
          >Login</p-button
        >
      }
    </header>
    <app-auth [(visible)]="visible" />

    <style>
      :host {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 0 16px;

        .main-header {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-radius: 8px;
          padding: 8px;

          .app-title {
            order: 2;
            flex: 0 0 fit-content;
            margin: -60px 0;
            padding: 16px 24px;
            border-radius: 8px;
          }
          .page-title {
            flex: 1 1 auto;
            order: 1;
            padding: 0 0 0 12px;
          }
          .header-btn {
            order: 3;
            flex: 1 1 auto;
            text-align: right;
          }
        }
      }
    </style>
  `,
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'Home';
  visible: boolean = false;
  isAuth: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authService
      .getAuthStatusListener()
      .subscribe((value) => {
        this.isAuth = value;
      });
  }

  showAuthModal() {
    this.visible = true;
  }

  logout() {
    this.authService.logout();
  }

  openAdminPage() {
    this.router.navigateByUrl('/admin');
  }
}
