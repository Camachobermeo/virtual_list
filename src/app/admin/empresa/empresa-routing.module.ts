import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurarComponent } from './configurar/configurar.component';
import { EmpresaFormularioComponent } from './empresa-formulario/empresa-formulario.component';

const routesModulos: Routes = [
  {
    path: '',
    component: EmpresaFormularioComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'configurar',
    component: ConfigurarComponent,
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
