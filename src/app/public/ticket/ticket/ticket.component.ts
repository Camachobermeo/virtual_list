import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/admin/tienda/tienda.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tiendas: any = new Array();
  cargando: boolean = false;

  constructor(
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.tiendaService.listarTiendas({}, this);
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    this.cargando = false;
  }

}
