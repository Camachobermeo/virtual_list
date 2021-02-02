import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiendaFormularioComponent } from './tienda-formulario/tienda-formulario.component';
import { TiendaListadoComponent } from './tienda-listado/tienda-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: TiendaListadoComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo',
    component: TiendaFormularioComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
