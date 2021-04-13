import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramarTicketComponent } from './programar-ticket.component';
import { ProgramarTicketRoutingModule } from './programar-ticket-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';



@NgModule({
  declarations: [ProgramarTicketComponent],
  imports: [
    CommonModule,
    ProgramarTicketRoutingModule,
    ComponentesGeneralesModule,
    FormsModule
  ]
})
export class ProgramarTicketModule { }
