import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoOperacionFormularioComponent } from './tipo-operacion-formulario/tipo-operacion-formulario.component';
import { TipoOperacionListadoComponent } from './tipo-operacion-listado/tipo-operacion-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: TipoOperacionListadoComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo',
    component: TipoOperacionFormularioComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class TipoOperacionRoutingModule { }
