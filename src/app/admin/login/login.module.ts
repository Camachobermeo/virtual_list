import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormularioComponent } from './login-formulario/login-formulario.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [LoginFormularioComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
