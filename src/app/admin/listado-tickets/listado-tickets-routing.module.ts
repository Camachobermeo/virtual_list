import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoTicketsComponent } from './listado-tickets.component';

const routesModulos: Routes = [
  {
    path: '',
    component: ListadoTicketsComponent,
    runGuardsAndResolvers: 'always'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class ListadoTicketsRoutingModule { }
