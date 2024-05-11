import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PostItem } from '../post.model';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PostService } from '../../../services/post-service/post.service';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DatePipe, ButtonModule],
  template: `
    <h4 class="title">{{ post.title }}</h4>
    @if(post.imagePath) {
    <div class="img-container">
      <img [src]="post.imagePath">
    </div>
    }
    <p class="content">{{ post.content }}</p>
    <p class="userdate"
      ><b>Username</b> -
      <i>{{ post.createdDate | date : 'dd/MM/yyyy HH:mm' }}</i></p
    >
    @if(isAdmin) {
    <div class="button-container">
      <p-button
        severity="secondary"
        icon="icon-pencil"
        label="Edit"
        (click)="$event.stopPropagation(); onEdit(post._id)"
      />
      <p-button
        severity="danger"
        icon="icon-trash"
        label="Delete"
        (click)="
          $event.stopPropagation(); onDelete(post._id)
        "
      />
    </div>
    }

    <style lang="scss">
      :host {
        padding: 16px 24px;
        background: var(--oc-blue-9);
        border-radius: 8px;

        &:not(.admin) {
          &:hover {
            cursor: pointer;
            background: var(--oc-blue-8);
          }
        }

        .title {
          color: var(--oc-gray-1);
          font-size: 1.6rem;
        }

        .img-container {
          img {
            padding: 20px 0;
            max-height: 200px;
          }
        }

        p {
          color: var(--oc-gray-0);
          line-height: 1.6;

          &.content {
            font-size: 1.2rem;
          }

          &.userdate {
            font-size: 0.8rem;
          }
        }

        .button-container {
          display: flex;
          padding: 16px 0;
          gap: 16px;
        }
      }
    </style>
  `,
})
export class PostItemComponent implements OnInit {
  @Input() post!: PostItem;
  @Input() isAdmin?: boolean;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @HostBinding('class.admin') adminClass: boolean = false;

  constructor(private router: Router, private postService: PostService){}

  ngOnInit(): void {
    if (this.isAdmin) {
      this.adminClass = this.isAdmin;
    }
  }

  onEdit(id: string) {
    if (this.isAdmin) {
      this.edit.emit(id);
      this.router.navigateByUrl(`/admin/post/edit/${id}`);
    }
  }

  onDelete(id: string) {
    if (this.isAdmin) {
      this.delete.emit(id);
      this.postService.deletePost(id);
    }
  }
}
