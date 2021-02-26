import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaFormularioComponent } from './empresa-formulario/empresa-formulario.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';



@NgModule({
  declarations: [EmpresaFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmpresaRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class EmpresaModule { }
