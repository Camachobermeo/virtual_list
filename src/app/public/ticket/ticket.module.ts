import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from '../../componentes-generales/componentes-generales.module';
import { TicketComponent } from './ticket.component';

@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class TicketModule { }
