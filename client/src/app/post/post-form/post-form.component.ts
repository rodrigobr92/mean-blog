import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, ButtonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {

  constructor(private postService: PostService) {}

  onAddPost(form: NgForm) {
    console.log(form.value);
    this.postService.addPostItem(form.value);
    form.reset();
  }
}
