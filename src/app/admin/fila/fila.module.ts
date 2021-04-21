import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilaFormularioComponent } from './fila-formulario/fila-formulario.component';
import { FilaListadoComponent } from './fila-listado/fila-listado.component';
import { FilaRoutingModule } from './fila-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';



@NgModule({
  declarations: [FilaFormularioComponent, FilaListadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    FilaRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class FilaModule { }
