import { Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Simple Blog',
    loadComponent: () =>
      import(
        './pages/page-template/page-template.component'
      ).then((x) => x.UserTemplateComponent),
    children: [
      {
        path: '',
        title: 'Simple Blog - Home',
        loadComponent: () =>
          import(
            './pages/home-page/home-page.component'
          ).then((x) => x.HomeComponent),
      },
      {
        path: 'post/:id',
        title: 'Simple Blog - Post',
        loadComponent: () =>
          import(
            './pages/post-page/post-page.component'
          ).then((x) => x.PostPageComponent),
      },
    ],
  },
  {
    path: 'admin',
    title: 'Simple Blog - Admin',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        './pages/admin/admin-template/admin-template.component'
      ).then((x) => x.AdminTemplateComponent),
    children: [
      {
        path: '',
        title: 'Simple Blog Admin',
        loadComponent: () =>
          import(
            './pages/admin/dashboard-page/dashboard-page.component'
          ).then((x) => x.DashboardPageComponent),
      },
      {
        path: 'post/create',
        title: 'Simple Blog Admin - Create post',
        loadComponent: () =>
          import(
            './pages/admin/manage-post-page/manage-post-page.component'
          ).then((x) => x.ManagePostPageComponent),
      },
      {
        path: 'post/edit/:id',
        title: 'Simple Blog Admin - Edit post',
        loadComponent: () =>
          import(
            './pages/admin/manage-post-page/manage-post-page.component'
          ).then((x) => x.ManagePostPageComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'Error',
    loadComponent: () =>
      import(
        './pages/error-page/error-page.component'
      ).then((x) => x.ErrorComponent),
  },
];
