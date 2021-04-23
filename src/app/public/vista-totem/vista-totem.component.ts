import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-vista-totem',
  templateUrl: './vista-totem.component.html',
  styleUrls: ['./vista-totem.component.css']
})
export class VistaTotemComponent implements OnInit {

  cargando: boolean;
  atenciones: any = new Array();

  constructor(
    public ticketService: TicketService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.ticketService.atenciones({}, this);
  }

  despuesDeListarAtenciones(data) {
    this.atenciones = data.resultado || [];
    this.cargando = false;
  }

}
