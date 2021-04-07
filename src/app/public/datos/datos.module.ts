import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './datos.component';
import { DatosRoutingModule } from './datos-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatosComponent],
  imports: [
    CommonModule,
    FormsModule,
    DatosRoutingModule
  ]
})
export class DatosModule { }
