import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormularioComponent } from './login-formulario/login-formulario.component';

const routesModulos: Routes = [
  {
    path: '',
    component: LoginFormularioComponent,
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
