import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'dashboard-aluno', canActivate: [AuthGuard],loadChildren: () => import('./pages/dashboard-aluno/dashboard-aluno.module').then(m => m.DashboardAlunoModule) },
  { path: 'dashboard-adm', canActivate: [AuthGuard], loadChildren: () => import('./pages/dashboard-adm/dashboard-adm.module').then(m => m.DashboardAdmModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
