import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramarTicketComponent } from './programar-ticket.component';

const routesModulos: Routes = [
  {
    path: '',
    component: ProgramarTicketComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class ProgramarTicketRoutingModule { }
