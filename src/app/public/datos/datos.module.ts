import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './datos.component';
import { DatosRoutingModule } from './datos-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [DatosComponent],
  imports: [
    CommonModule,
    FormsModule,
    DatosRoutingModule,
    ComponentesGeneralesModule,
    Ng2TelInputModule
  ]
})
export class DatosModule { }
