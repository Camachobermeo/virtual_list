import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class AdminModule { }
