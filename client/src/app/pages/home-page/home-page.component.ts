import { Component, OnInit } from '@angular/core';
import { CommentListComponent } from '../../components/comment/comment-list/comment-list.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PostListComponent } from '../../components/post/post-list/post-list.component';
import { UserListComponent } from '../../components/user/user-list/user-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    PostListComponent,
    UserListComponent,
    CommentListComponent,
  ],
  template: `
    <app-post-list />
    <app-user-list />

    <style>
      :host {
        display: flex;
        gap: 24px;

        app-post-list {
          flex: 1 1 auto;
        }

        app-user-list {
          flex: 0 0 fit-content;
          min-width: 320px;
        }
      }
    </style>
  `,
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    console.log('Test');
  }
}
