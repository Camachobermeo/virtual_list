import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { ActualizarRoutingModule } from './actualizar-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ActualizarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentesGeneralesModule,
    ActualizarRoutingModule
  ]
})
export class ActualizarModule { }
