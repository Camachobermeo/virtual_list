import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'totem',
    loadChildren: () => import('./admin/totem/totem.module').then(m => m.TotemModule)
  },
  {
    path: '',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./admin/empresa/empresa.module').then(m => m.EmpresaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }