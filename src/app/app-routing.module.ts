import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

const routes: Routes = [
  {
    path: 'totem',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/totem/totem.module').then(m => m.TotemModule)
  },
  {
    path: '',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule),
    resolve: {
      ocultarMenu: 'ocultarMenu'
    }
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
    loadChildren: () => import('./admin/login/login.module').then(m => m.LoginModule),
    resolve: {
      ocultarMenu: 'ocultarMenu'
    }
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
    loadChildren: () => import('./admin/listado-tickets/listado-tickets.module').then(m => m.ListadoTicketsModule)
  },
  {
    path: 'correo',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/correo/correo.module').then(m => m.CorreoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule],
  providers: [
    {
      provide: 'ocultarMenu',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 'ocultarMenu'
    }
  ]
})
export class AppRoutingModule { }