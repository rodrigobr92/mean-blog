import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostListComponent } from '../../components/post/post-list/post-list.component';
import { PostFormComponent } from '../../components/post/post-form/post-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PostListComponent, PostFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
