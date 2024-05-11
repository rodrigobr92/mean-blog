import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink],
  template: `
    <!-- Admin template -->
    <div class="admin-header">
      <p-button routerLink="/admin">Admin</p-button>
      <p-button routerLink="/">Home</p-button>
      <p-button routerLink="/admin/post/create">Create post</p-button>
      <h1>Admin header</h1>
    </div>
    <router-outlet></router-outlet>

    <style>
      :host {
        .admin-header {
          display: flex;
          gap: 16px;
          padding: 20px 0;
        }
      }
    </style>
  `,
})
export class AdminTemplateComponent {}
