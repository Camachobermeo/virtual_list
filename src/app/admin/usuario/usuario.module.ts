import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';



@NgModule({
  declarations: [UsuarioListadoComponent, UsuarioFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class UsuarioModule { }
