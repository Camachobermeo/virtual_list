import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilaFormularioComponent } from './fila-formulario/fila-formulario.component';
import { FilaListadoComponent } from './fila-listado/fila-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: FilaListadoComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo',
    component: FilaFormularioComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'editar/:codigo',
    component: FilaFormularioComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class FilaRoutingModule { }
