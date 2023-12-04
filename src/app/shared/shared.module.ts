import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { LoaderModule } from '../components/loader/loader.module';
import { MenuModule } from '../components/menu/menu.module';




@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ButtonModule,
    LoaderModule,
    MenuModule
  ]
})
export class SharedModule { }
