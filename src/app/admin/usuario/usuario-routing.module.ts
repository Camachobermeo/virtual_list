import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: UsuarioListadoComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo',
    component: UsuarioFormularioComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
