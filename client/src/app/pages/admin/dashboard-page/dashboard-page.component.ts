import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../../../components/post/post-list/post-list.component';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PostListComponent],
  template: `
    <app-post-list
      [isAdmin]="true"
      [userId]="userId"
    ></app-post-list>
  `,
})
export class DashboardPageComponent implements OnInit {
  userId?: string;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.authService
      .getAuthStatusListener()
      .subscribe((value) => {
        this.userId = this.authService.getUserId();
      });
  }
}
