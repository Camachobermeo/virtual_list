import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaFormularioComponent } from './empresa-formulario/empresa-formulario.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { ConfigurarComponent } from './configurar/configurar.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [EmpresaFormularioComponent, ConfigurarComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmpresaRoutingModule,
    ComponentesGeneralesModule,
    FileUploadModule
  ]
})
export class EmpresaModule { }
