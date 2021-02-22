import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoOperacionFormularioComponent } from './tipo-operacion-formulario/tipo-operacion-formulario.component';
import { TipoOperacionListadoComponent } from './tipo-operacion-listado/tipo-operacion-listado.component';
import { TipoOperacionRoutingModule } from './tipo-operaion-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TipoOperacionFormularioComponent, TipoOperacionListadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    TipoOperacionRoutingModule
  ]
})
export class TipoOperacionModule { }
