import { Component } from '@angular/core';
import { PostListComponent } from '../../../components/post/post-list/post-list.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PostListComponent],
  template: `
    <app-post-list [isAdmin]="true"></app-post-list>
  `,
})
export class DashboardPageComponent {

}
