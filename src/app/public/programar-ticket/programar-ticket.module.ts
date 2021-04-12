import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramarTicketComponent } from './programar-ticket.component';
import { ProgramarTicketRoutingModule } from './programar-ticket-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProgramarTicketComponent],
  imports: [
    CommonModule,
    ProgramarTicketRoutingModule,
    FormsModule
  ]
})
export class ProgramarTicketModule { }
