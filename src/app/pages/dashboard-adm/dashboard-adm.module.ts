import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdmRoutingModule } from './dashboard-adm-routing.module';
import { DashboardAdmComponent } from './dashboard-adm.component';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    DashboardAdmComponent
  ],
  imports: [
    CommonModule,
    DashboardAdmRoutingModule,
    MenuModule,
    DialogModule,
    ToastModule
  ]
})
export class DashboardAdmModule { }
