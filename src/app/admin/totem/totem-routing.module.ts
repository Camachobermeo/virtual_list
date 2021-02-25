import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotemFormularioComponent } from './totem-formulario/totem-formulario.component';
import { TotemListadoComponent } from './totem-listado/totem-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: TotemListadoComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo',
    component: TotemFormularioComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'editar/:codigo',
    component: TotemFormularioComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class TotemRoutingModule { }
