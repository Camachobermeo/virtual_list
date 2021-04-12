import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

const routesPublicas: Routes = [
  {
    path: '',
    component: PublicComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
      },
      {
        path: 'tienda/:tienda',
        loadChildren: () => import('./tipo-ticket/tipo-ticket.module').then(m => m.TipoTicketModule)
      },
      {
        path: 'tipo/:tienda/:tipo',
        loadChildren: () => import('./datos/datos.module').then(m => m.DatosModule)
      },
      {
        path: 'programar/:tienda/:tipo',
        loadChildren: () => import('./programar-ticket/programar-ticket.module').then(m => m.ProgramarTicketModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesPublicas)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }