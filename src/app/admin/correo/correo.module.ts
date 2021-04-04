import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorreoComponent } from './correo.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { FormsModule } from '@angular/forms';
import { CorreoRoutingModule } from './correo-routing.module';



@NgModule({
  declarations: [CorreoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentesGeneralesModule,
    CorreoRoutingModule
  ]
})
export class CorreoModule { }
