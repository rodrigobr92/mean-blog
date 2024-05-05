import { Component, Input } from '@angular/core';
import { PostItem } from '../post.model';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss'
})
export class PostItemComponent {
  @Input() post!: PostItem;

}
