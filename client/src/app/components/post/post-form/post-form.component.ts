import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PostService } from '../../../services/post-service/post.service';
import {
  FileSelectEvent,
  FileUploadModule,
} from 'primeng/fileupload';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  template: `
    <h3>Create</h3>
    @if (!isLoading) {
      <form
        class="post-form"
        [formGroup]="postForm"
        enctype="multipart/form-data"
        (ngSubmit)="submitPost()"
      >
        <p-fileUpload
          mode="basic"
          chooseLabel="Upload an Image"
          accept="image/*"
          (onSelect)="onUploadImage($event)"
        />

        @if (imagePreview) {
          <div class="image-preview">
            <img [src]="imagePreview" />
          </div>
        }
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          pInputText
          formControlName="title"
        />
        <label for="content">Content</label>
        <textarea
          id="content"
          rows="5"
          cols="30"
          pInputTextarea
          formControlName="content"
        ></textarea>
        <p-button
          label="Submit"
          type="submit"
          [disabled]="!postForm.valid"
        ></p-button>
      </form>
    } @else {
      Saving...
    }
    <style>
      .post-form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 400px;

        .image-preview {
          img {
            max-height: 100px;
          }
        }
      }
    </style>
  `,
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  isLoading: boolean = false;
  imagePreview!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      _id: new FormControl(null),
      title: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
        ],
      }),
      content: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
        ],
      }),
      image: new FormControl(null),
      iamgePath: new FormControl(null),
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postService
          .getPostItem(id)
          .subscribe((result) => {
            this.postForm.patchValue(result.post);
            if (result.post.imagePath) {
              this.imagePreview = result.post.imagePath;
            }
            // this.postForm = result.post;
          });
      }
    });
  }

  onUploadImage(event: FileSelectEvent) {
    const file = event.files[0];
    this.postForm.patchValue({ image: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submitPost() {
    if (this.postForm && this.postForm.valid) {
      this.isLoading = true;
      this.postService.savePost(this.postForm.value);
      // this.postForm.reset();
      // this.router.navigateByUrl('/admin');
      this.isLoading = false;
    }
  }
}
