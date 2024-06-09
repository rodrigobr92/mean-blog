import { AuthComponent } from './../auth/auth.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, RouterLink, AuthComponent],
  template: `
    <header class="main-header">
      <h1 class="app-title">Blog</h1>
      <h2 class="page-title">{{ pageTitle }}</h2>
      <p-button
        class="header-btn"
        (click)="showAuthModal()"
        >Login</p-button
      >
    </header>
    <app-auth [(visible)]="visible" />
  `,
})
export class HeaderComponent {
  pageTitle: string = 'Home';
  visible: boolean = false;

  showAuthModal() {
    this.visible = true;
  }
}
