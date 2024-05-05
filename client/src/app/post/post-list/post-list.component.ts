import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PostService } from '../post-service/post.service';
import { PostItem } from '../post.model';
import { Subscription } from 'rxjs';
import { PostItemComponent } from '../post-item/post-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostItemComponent,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent
  implements OnInit, OnDestroy
{
  searchValue: string = '';
  isSearchLoading: boolean = false;
  postList: PostItem[] = [];
  postSubscription!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostList();
    this.postSubscription =
      this.postService.postsSub.subscribe(
        (postList: PostItem[]) => {
          this.postList = postList;
        }
      );
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
