import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../servicios/auth-guard.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:  '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'totem',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./totem/totem.module').then(m => m.TotemModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'empresa',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'tienda',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'usuario',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'tipo-operacion',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./tipo-operacion/tipo-operacion.module').then(m => m.TipoOperacionModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'perfil',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'principal',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'actualizar',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./actualizar/actualizar.module').then(m => m.ActualizarModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'tickets',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./listado-tickets/listado-tickets.module').then(m => m.ListadoTicketsModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'correo',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./correo/correo.module').then(m => m.CorreoModule),
        runGuardsAndResolvers: 'always'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }