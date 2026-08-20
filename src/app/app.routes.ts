import { Routes } from '@angular/router';
import { authGuard } from '../app/features/auth/auth.Guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/auth').then((m) => m.Auth),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashborad/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard], 
  },
  {
    path: '**',
    redirectTo: 'login', 
  },
];