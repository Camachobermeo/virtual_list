import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';



@NgModule({
  declarations: [UsuarioListadoComponent, UsuarioFormularioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule 
  ]
})
export class UsuarioModule { }
