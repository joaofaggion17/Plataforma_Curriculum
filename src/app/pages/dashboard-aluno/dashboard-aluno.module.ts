import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAlunoRoutingModule } from './dashboard-aluno-routing.module';
import { DashboardAlunoComponent } from './dashboard-aluno.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardAlunoComponent
  ],
  imports: [
    CommonModule,
    DashboardAlunoRoutingModule,
    SharedModule
  ]
})
export class DashboardAlunoModule { }
