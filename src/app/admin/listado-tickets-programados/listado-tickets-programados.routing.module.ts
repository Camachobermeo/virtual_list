import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoTicketsProgramadosComponent } from './listado-tickets-programados.component';

const routesModulos: Routes = [
  {
    path: '',
    component: ListadoTicketsProgramadosComponent,
    runGuardsAndResolvers: 'always'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class ListadoTicketsProgramadosRoutingModule { }
