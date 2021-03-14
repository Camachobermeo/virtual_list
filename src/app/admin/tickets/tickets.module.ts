import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    FormsModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
