import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostItem } from '../../components/post/post.model';
import { PostService } from '../../services/post-service/post.service';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [DatePipe],
  template: `
    @if (post) {
      <h4>{{ post.title }}</h4>
      @if (post.imagePath) {
        <img
          width="300px"
          class="img-container"
          [src]="post.imagePath"
        />
      }
      <p class="content">{{ post.content }}</p>
      <p class="userdate"
        ><b>{{ post.username }}</b> -
        <i>{{
          post.createdDate | date: 'dd/MM/yyyy HH:mm'
        }}</i></p
      >
    }
  `,
})
export class PostPageComponent implements OnInit {
  post!: PostItem;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postService
          .getPostItem(id)
          .subscribe((result) => {
            this.post = result.post;
          });
      }
    });
  }
}
