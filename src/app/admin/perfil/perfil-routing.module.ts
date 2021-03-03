import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';

const routesModulos: Routes = [
  {
    path: '',
    component: PerfilComponent,
    runGuardsAndResolvers: 'always'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
