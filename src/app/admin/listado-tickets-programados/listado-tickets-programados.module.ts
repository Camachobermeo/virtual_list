import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoTicketsProgramadosComponent } from './listado-tickets-programados.component';
import { ListadoTicketsProgramadosRoutingModule } from './listado-tickets-programados.routing.module';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListadoTicketsProgramadosComponent],
  imports: [
    ComponentesGeneralesModule,
    FormsModule,
    CommonModule,
    ListadoTicketsProgramadosRoutingModule
  ]
})
export class ListadoTicketsProgramadosModule { }
