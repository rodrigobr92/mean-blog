import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { PostItem } from '../post.types';
import { Subscription } from 'rxjs';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostItemComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  postList: PostItem[] = [];
  postSubscription!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostList();
    this.postSubscription = this.postService.postsSub.subscribe(
      (postList: PostItem[]) => {
        this.postList = postList;
      }
    );
  }

  ngOnDestroy(): void {
      this.postSubscription.unsubscribe();
  }
}
