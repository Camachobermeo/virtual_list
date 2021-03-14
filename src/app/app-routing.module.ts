import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

const routes: Routes = [
  {
    path: 'totem',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/totem/totem.module').then(m => m.TotemModule)
  },
  {
    path: '',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'empresa',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/empresa/empresa.module').then(m => m.EmpresaModule)
  },
  {
    path: 'tienda',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/tienda/tienda.module').then(m => m.TiendaModule)
  },
  {
    path: 'usuario',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./admin/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'tipo-operacion',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/tipo-operacion/tipo-operacion.module').then(m => m.TipoOperacionModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/perfil/perfil.module').then(m => m.PerfilModule)
  },
  {
    path: 'principal',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: 'actualizar',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/actualizar/actualizar.module').then(m => m.ActualizarModule)
  },
  {
    path: 'tickets',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/tickets/tickets.module').then(m => m.TicketsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }