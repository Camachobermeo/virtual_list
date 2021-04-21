import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilaTicketComponent } from './fila-ticket.component';
import { FormsModule } from '@angular/forms';
import { FilaTicketRoutingModule } from './fila-routing.module';



@NgModule({
  declarations: [FilaTicketComponent],
  imports: [
    CommonModule,
    FormsModule,
    FilaTicketRoutingModule
  ]
})
export class FilaTicketModule { }
