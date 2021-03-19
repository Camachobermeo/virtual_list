import { NgModule } from '@angular/core';
import { ListadoTicketsComponent } from './listado-tickets.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { FormsModule } from '@angular/forms';
import { ListadoTicketsRoutingModule } from './listado-tickets-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ListadoTicketsComponent],
  imports: [
    ComponentesGeneralesModule,
    FormsModule,
    CommonModule,
    ListadoTicketsRoutingModule
  ]
})
export class ListadoTicketsModule { }
