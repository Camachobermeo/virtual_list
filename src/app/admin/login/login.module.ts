import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormularioComponent } from './login-formulario/login-formulario.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';



@NgModule({
  declarations: [LoginFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ComponentesGeneralesModule 
  ]
})
export class LoginModule { }
