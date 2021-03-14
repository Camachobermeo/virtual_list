import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { ActualizarRoutingModule } from './actualizar-routing.module';



@NgModule({
  declarations: [ActualizarComponent],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    ActualizarRoutingModule
  ]
})
export class ActualizarModule { }
