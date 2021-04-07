import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTicketComponent } from './tipo-ticket.component';
import { FormsModule } from '@angular/forms';
import { TipoTicketRoutingModule } from './tipo-ticket-routing.module';



@NgModule({
  declarations: [TipoTicketComponent],
  imports: [
    CommonModule,
    FormsModule,
    TipoTicketRoutingModule
  ]
})
export class TipoTicketModule { }
