import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class UserTemplateComponent {

}
