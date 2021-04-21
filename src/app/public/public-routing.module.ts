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
        path: 'sucursal/:sucursal',
        loadChildren: () => import('./fila-ticket/fila.module').then(m => m.FilaTicketModule)
      },
      {
        path: 'fila/:sucursal/:fila',
        loadChildren: () => import('./datos/datos.module').then(m => m.DatosModule)
      },
      {
        path: 'programar/:sucursal/:fila',
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