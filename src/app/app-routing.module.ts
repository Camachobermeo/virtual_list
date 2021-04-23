import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./admin/login/login.module').then(m => m.LoginModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'ver',
    loadChildren: () => import('./admin/listado-tickets/listado-tickets.module').then(m => m.ListadoTicketsModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'atenciones',
    loadChildren: () => import('./public/vista-totem/vista-totem.module').then(m => m.VistaTotemModule),
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }