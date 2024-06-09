import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink],
  template: `
    <!-- Admin template -->
    <div class="admin-header">
      <h1><a routerLink="/admin">Admin</a></h1>
      <p-button routerLink="/admin/post/create"
        >Create post</p-button
      >
      <p-button (click)="logout()">Logout</p-button>
      <p-button routerLink="/">Home</p-button>
    </div>

    <router-outlet></router-outlet>

    <style>
      :host {
        .admin-header {
          justify-content: space-between;
          display: flex;
          gap: 16px;
          padding: 20px 0;
        }
      }
    </style>
  `,
})
export class AdminTemplateComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
  logout() {
    this.authService.logout();
  }
}
