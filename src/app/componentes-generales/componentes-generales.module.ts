import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargandoComponent } from './cargando/cargando.component';



@NgModule({
  declarations: [CargandoComponent],
  imports: [
    CommonModule
  ],
  exports: [CargandoComponent]
})
export class ComponentesGeneralesModule { }
