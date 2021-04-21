import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SucursalFormularioComponent } from './sucursal-formulario/sucursal-formulario.component';
import { SucursalListadoComponent } from './sucursal-listado/sucursal-listado.component';

const routesModulos: Routes = [
  {
    path: '',
    component: SucursalListadoComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'nuevo',
    component: SucursalFormularioComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'editar/:codigo',
    component: SucursalFormularioComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }
