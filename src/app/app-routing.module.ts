import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';
import { MenuResolve } from './servicios/menu.resolve';

const routes: Routes = [
  {
    path: 'totem',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/totem/totem.module').then(m => m.TotemModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'empresa',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/empresa/empresa.module').then(m => m.EmpresaModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'tienda',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/tienda/tienda.module').then(m => m.TiendaModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'usuario',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/usuario/usuario.module').then(m => m.UsuarioModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'login',
    loadChildren: () => import('./admin/login/login.module').then(m => m.LoginModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'tipo-operacion',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/tipo-operacion/tipo-operacion.module').then(m => m.TipoOperacionModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'perfil',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/perfil/perfil.module').then(m => m.PerfilModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'principal',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/principal/principal.module').then(m => m.PrincipalModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'actualizar',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/actualizar/actualizar.module').then(m => m.ActualizarModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'tickets',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/listado-tickets/listado-tickets.module').then(m => m.ListadoTicketsModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'correo',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/correo/correo.module').then(m => m.CorreoModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'ver',
    loadChildren: () => import('./admin/listado-tickets/listado-tickets.module').then(m => m.ListadoTicketsModule),
    resolve: {
      menu: MenuResolve
    },
    runGuardsAndResolvers: 'always'
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