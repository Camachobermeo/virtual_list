import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorreoComponent } from './correo.component';

const routesModulos: Routes = [
  {
    path: '',
    component: CorreoComponent,
    runGuardsAndResolvers: 'always'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class CorreoRoutingModule { }
