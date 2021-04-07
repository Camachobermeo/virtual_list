import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoTicketComponent } from './tipo-ticket.component';

const routesModulos: Routes = [
  {
    path: '',
    component: TipoTicketComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class TipoTicketRoutingModule { }
