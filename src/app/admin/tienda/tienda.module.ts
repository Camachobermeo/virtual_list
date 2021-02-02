import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaListadoComponent } from './tienda-listado/tienda-listado.component';
import { TiendaFormularioComponent } from './tienda-formulario/tienda-formulario.component';
import { TiendaRoutingModule } from './tienda-routing.module';


@NgModule({
  declarations: [TiendaListadoComponent, TiendaFormularioComponent],
  imports: [
    CommonModule,
    TiendaRoutingModule
  ]
})
export class TiendaModule { }
