import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { FormsModule } from '@angular/forms';
import { PrincipalRoutingModule } from './principal-routing.module';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrincipalRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class PrincipalModule { }
