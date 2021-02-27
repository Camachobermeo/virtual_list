import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormularioComponent } from './login-formulario/login-formulario.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
