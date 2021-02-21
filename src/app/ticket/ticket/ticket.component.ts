import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/admin/tienda/tienda.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tiendas: any = new Array();
  tiendaSeleccionada: string = "";

  constructor(
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    if (this.tiendaSeleccionada) {
      this.listarTiposOperacion();
    }
  }

  listarTiposOperacion() {

  }

}
