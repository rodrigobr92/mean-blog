import { Injectable } from '@angular/core';
import { PostItem } from '../../components/post/post.types';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: PostItem[] = [];
  public postsSub = new Subject<PostItem[]>();
  private url = 'http://localhost:3333/api/posts';

  constructor(private http: HttpClient) {}

  getPostList() {
    this.http
      .get<{ message: String; posts: PostItem[] }>(
        `${this.url}`
      )
      .subscribe((e) => {
        this.posts = e.posts;
        this.postsSub.next(this.posts.slice());
      });
  }

  addPostItem(item: PostItem) {
    this.http
      .post<{ message: String; postId: string }>(
        `${this.url}`,
        item
      )
      .subscribe((e) => {
        item._id = e.postId;
        this.posts.push(item);
        this.postsSub.next(this.posts.slice());
      });

    this.getPostList();
  }
}
