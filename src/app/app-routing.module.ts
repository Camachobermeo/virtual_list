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
  {
    path: 'tienda',
    loadChildren: () => import('./admin/tienda/tienda.module').then(m => m.TiendaModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./admin/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./admin/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'tipo-operacion',
    loadChildren: () => import('./admin/tipo-operacion/tipo-operacion.module').then(m => m.TipoOperacionModule)
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