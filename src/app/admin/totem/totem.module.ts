import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotemListadoComponent } from './totem-listado/totem-listado.component';
import { TotemFormularioComponent } from './totem-formulario/totem-formulario.component';
import { TotemRoutingModule } from './totem-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';


@NgModule({
  declarations: [TotemListadoComponent, TotemFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    TotemRoutingModule,
    ComponentesGeneralesModule 
  ]
})
export class TotemModule { }
