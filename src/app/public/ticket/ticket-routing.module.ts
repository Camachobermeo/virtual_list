import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';

const routesModulos: Routes = [
  {
    path: '',
    component: TicketComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
