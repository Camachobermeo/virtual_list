import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosComponent } from './datos.component';

const routesModulos: Routes = [
  {
    path: '',
    component: DatosComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
