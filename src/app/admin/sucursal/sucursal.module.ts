import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalListadoComponent } from './sucursal-listado/sucursal-listado.component';
import { SucursalFormularioComponent } from './sucursal-formulario/sucursal-formulario.component';
import { SucursalRoutingModule } from './sucursal-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';


@NgModule({
  declarations: [SucursalListadoComponent, SucursalFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    SucursalRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class Sucursal { }
