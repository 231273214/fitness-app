import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'workout',
    loadComponent: () => import('./pages/workout/workout.page').then(m => m.WorkoutPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];