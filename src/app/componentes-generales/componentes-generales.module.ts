import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargandoComponent } from './cargando/cargando.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';



@NgModule({
  declarations: [CargandoComponent, PiePaginaComponent, EncabezadoComponent],
  imports: [
    CommonModule
  ],
  exports: [CargandoComponent, PiePaginaComponent, EncabezadoComponent]
})
export class ComponentesGeneralesModule { }
