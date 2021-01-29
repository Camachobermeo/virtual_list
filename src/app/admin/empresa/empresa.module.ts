import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaFormularioComponent } from './empresa-formulario/empresa-formulario.component';
import { EmpresaRoutingModule } from './empresa-routing.module';



@NgModule({
  declarations: [EmpresaFormularioComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule { }
