import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PostService } from '../../../services/post-service/post.service';
import { PostItem } from '../post.model';
import { Subscription } from 'rxjs';
import { PostItemComponent } from '../post-item/post-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Pagination } from '../../../types/shared.types';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostItemComponent,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    ButtonModule,
  ],
  template: `
    <div class="post-list">
      <p-inputGroup>
        <p-inputGroupAddon>
          <i class="icon-search"></i>
        </p-inputGroupAddon>
        <input
          type="text"
          pInputText
          [(ngModel)]="searchValue"
        />
        @if (isSearchLoading) {
        <p-inputGroupAddon>
          <i class="icon-loader-circle"></i>
        </p-inputGroupAddon>
        }
      </p-inputGroup>

      <div>
        <p-button
          icon="icon-arrow-big-left"
          [disabled]="pagination.page == 1"
          (onClick)="previousPage()"
        ></p-button>
        <p-button
          icon="icon-arrow-big-right"
          [disabled]="isLastPage()"
          (onClick)="nextPage()"
        ></p-button>
        <span>{{ this.pagination.total }}</span>
      </div>
      @for (post of postList; track $index) {
      <app-post-item
        [isAdmin]="isAdmin"
        [post]="post"
        (click)="openPost(post._id)"
      />
      } @empty {
      <div>Nenhum post adicionado</div>
      }
    </div>

    <style>
      .post-list {
        padding: 16px 24px;
        background: var(--oc-blue-0);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        p-inputGroup {
          padding: 0 0 16px;
        }
      }
    </style>
  `,
})
export class PostListComponent
  implements OnInit, OnDestroy
{
  @Input() isAdmin?: boolean;
  searchValue: string = '';
  isSearchLoading: boolean = false;
  postList: PostItem[] = [];
  postSubscription!: Subscription;
  pagination: Pagination = {
    page: 1,
    pageSize: 2,
    total: 0
  };

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPostList();
    this.postSubscription =
      this.postService.postsSub.subscribe(
        (postList: PostItem[]) => {
          this.postList = postList;
          this.pagination = this.postService.getPagination();
        }
      );
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  openPost(_id: string) {
    if (!this.isAdmin) {
      this.router.navigateByUrl(`post/${_id}`);
    }
  }

  nextPage(): void {
    this.postService.changePage(++this.pagination.page);
    this.getPosts();
  }

  previousPage(): void {
    this.postService.changePage(--this.pagination.page);
    this.getPosts();
  }

  isLastPage(): boolean {
    return this.postService.isLastPage();
  }
}
