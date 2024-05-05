import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Simple Blog',
    loadComponent: () =>
      import('./home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: '**',
    title: 'Error',
    loadComponent: () =>
      import('./error/error.component').then((x) => x.ErrorComponent),
  },
];
