import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../servicios/auth-guard.service';
import { PublicComponent } from './public.component';

const routesPublicas: Routes = [
  {
    path:  '',
    component: PublicComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule),
        runGuardsAndResolvers: 'always'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesPublicas)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }