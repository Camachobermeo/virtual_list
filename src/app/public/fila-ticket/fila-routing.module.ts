import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilaTicketComponent } from './fila-ticket.component';

const routesModulos: Routes = [
  {
    path: '',
    component: FilaTicketComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class FilaTicketRoutingModule { }
