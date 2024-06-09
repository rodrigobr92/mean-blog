import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { MatchPasswordDirective } from './matchPassword.directive';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    TabViewModule,
    DialogModule,
    MatchPasswordDirective,
  ],
  template: `
    <p-dialog
      header="Welcome"
      position="topright"
      [modal]="true"
      [closeOnEscape]="true"
      [draggable]="false"
      [closable]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <p-tabView>
        <p-tabPanel header="Login">
          <form
            class="auth-form login-form"
            #loginForm="ngForm"
            (ngSubmit)="onLogin(loginForm)"
          >
            <input
              name="email"
              type="text"
              #email="ngModel"
              ngModel
              pInputText
              placeholder="Email"
              minlength="6"
              required
              email
            />
            @if (
              email.invalid && email.dirty && email.touched
            ) {
              <p>Invalid email</p>
            }
            <p-password
              placeholder="Password"
              name="password"
              promptLabel="Choose a password"
              [feedback]="false"
              [toggleMask]="true"
              minlength="6"
              required
              #password="ngModel"
              ngModel
            />
            @if (
              password.invalid &&
              password.dirty &&
              password.touched
            ) {
              <p *ngIf="password.hasError('minlength')">
                Password must be 6 charaters or more
              </p>
            }
            <div>
              <p-button
                label="Sign"
                type="submit"
                [disabled]="loginForm.invalid"
              />
            </div>
          </form>
        </p-tabPanel>
        <p-tabPanel header="Signup">
          <form
            class="auth-form login-form"
            #signupForm="ngForm"
            appMatchPassword
            password="password"
            confirmPassword="confirmPassword"
            (ngSubmit)="onSignup(signupForm)"
          >
            <input
              name="email"
              type="text"
              ngModel
              #email="ngModel"
              pInputText
              placeholder="Email"
              minlength="6"
              required
              email
            />
            <input
              name="username"
              type="text"
              ngModel
              #user="ngModel"
              pInputText
              placeholder="Username"
              minlength="3"
              required
            />
            <p-password
              placeholder="Password"
              name="password"
              ngModel
              #password="ngModel"
              promptLabel="Choose a password"
              weakLabel="Weak"
              mediumLabel="Average"
              strongLabel="Good"
              minlength="6"
              required
              [toggleMask]="true"
            />
            <p-password
              placeholder="Confirm password"
              name="confirmPassword"
              ngModel
              #confirmPassword="ngModel"
              promptLabel="Repeat the password"
              [feedback]="false"
              minlength="6"
              required
              [toggleMask]="true"
            />
            @if (
              confirmPassword.errors?.[
                'passwordMismatch'
              ] &&
              confirmPassword.dirty &&
              confirmPassword.touched
            ) {
              <p> Password does not match </p>
            }
            <div>
              <p-button
                label="Sign"
                type="submit"
                [disabled]="signupForm.invalid"
              />
            </div>
          </form>
        </p-tabPanel>
      </p-tabView>
    </p-dialog>

    <style>
      .auth-form {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        gap: 16px;

        .p-inputwrapper {
          width: 100%;
        }
        .p-inputtext {
          width: 100%;
        }
      }
    </style>
  `,
})
export class AuthComponent implements OnInit {
  private _visible: boolean = false;
  @Input() set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(value);
  }
  get visible(): boolean {
    return this._visible;
  }
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    console.log('login');
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.authService.login(
      form.value.email,
      form.value.password,
    );

    this.visible = false;
  }

  onSignup(form: NgForm) {
    console.log('signup');
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.authService.createUser({
      email: form.value.email,
      password: form.value.password,
      username: form.value.username,
    });

    this.visible = false;
  }
}
