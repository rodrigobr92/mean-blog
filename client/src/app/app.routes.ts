import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'AndOther Blog',
    loadComponent: () =>
      import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: '**',
    title: 'AndOther Error',
    loadComponent: () =>
      import('./pages/error/error.component').then((x) => x.ErrorComponent),
  },
];
