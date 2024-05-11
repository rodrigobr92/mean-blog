import { Component } from '@angular/core';
import { PostFormComponent } from '../../../components/post/post-form/post-form.component';

@Component({
  selector: 'app-manage-post-page',
  standalone: true,
  imports: [PostFormComponent],
  template: `
    <app-post-form />
  `,
  styles: ``
})
export class ManagePostPageComponent {

}
