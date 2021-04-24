import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilaTicketComponent } from './fila-ticket.component';
import { FormsModule } from '@angular/forms';
import { FilaTicketRoutingModule } from './fila-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [FilaTicketComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    FilaTicketRoutingModule
  ]
})
export class FilaTicketModule { }
