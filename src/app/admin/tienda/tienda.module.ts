import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaListadoComponent } from './tienda-listado/tienda-listado.component';
import { TiendaFormularioComponent } from './tienda-formulario/tienda-formulario.component';
import { TiendaRoutingModule } from './tienda-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';


@NgModule({
  declarations: [TiendaListadoComponent, TiendaFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    TiendaRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class TiendaModule { }
