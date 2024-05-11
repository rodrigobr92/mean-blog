import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostItem } from '../../components/post/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: PostItem[] = [];
  public postsSub = new Subject<PostItem[]>();
  private apiUrl = 'http://localhost:3333/api/posts';

  constructor(private http: HttpClient) {}

  getPostList() {
    this.http
      .get<{ message: string; posts: PostItem[] }>(
        `${this.apiUrl}`
      )
      .subscribe((e) => {
        this.posts = e.posts;
        this.postsSub.next(this.posts.slice());
      });
  }

  getPostItem(id: string) {
    return this.http.get<{
      message: string;
      post: PostItem;
    }>(`${this.apiUrl}/${id}`);
  }

  savePost(item: PostItem) {
    const postData = new FormData();
    postData.append('_id', item._id);
    postData.append('title', item.title);
    postData.append('content', item.content);
    if (item.imagePath) {
      postData.append('imagePath', item.imagePath);
    }
    if (item.image) {
      postData.append('image', item.image, item.title);
    }

    if (!item._id) {
      this.http
        .post<{ message: string; postId: string }>(
          `${this.apiUrl}`,
          postData
        )
        .subscribe((e) => {
          this.getPostList();
        });
    } else {
      this.http
        .put<{ message: string; postId: string }>(
          `${this.apiUrl}`,
          postData
        )
        .subscribe(() => {
          this.getPostList();
        });
    }
  }

  deletePost(id: string) {
    if (id) {
      this.http
        .delete<{ message: string }>(`${this.apiUrl}/${id}`)
        .subscribe(() => {
          this.getPostList();
        });
    }
  }
}
