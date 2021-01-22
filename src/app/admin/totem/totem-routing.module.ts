import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotemListadoComponent } from './totem-listado/totem-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: TotemListadoComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class TotemRoutingModule { }
