import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PostListComponent } from '../post/post-list/post-list.component';
import { CommentListComponent } from '../comments/comment-list/comment-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PostListComponent, CommentListComponent],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss'
})
export class HomeComponent {

}
