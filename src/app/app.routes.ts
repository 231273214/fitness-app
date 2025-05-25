import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./auth/register/register.page').then(m => m.RegisterPage) },
  { path: 'workout', loadComponent: () => import('./pages/workout/workout.page').then(m => m.WorkoutPage) },
  { path: 'history', loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage) },
  { path: 'exercise-library', loadComponent: () => import('./pages/exercise-library/exercise-library.page').then(m => m.ExerciseLibraryPage) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];