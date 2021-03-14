import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizarComponent } from './actualizar.component';

const routesModulos: Routes = [
  {
    path: '',
    component: ActualizarComponent,
    runGuardsAndResolvers: 'always'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class ActualizarRoutingModule { }
