import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoOperacionService } from 'src/app/admin/tipo-operacion/tipo-operacion.service';
import { Tienda } from 'src/app/entidades/Tienda';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tipo-ticket',
  templateUrl: './tipo-ticket.component.html',
  styleUrls: ['./tipo-ticket.component.css']
})
export class TipoTicketComponent implements OnInit {

  tipos: any = new Array();
  tiendaSeleccionada: string = "";
  cargando: boolean = false;
  tienda: Tienda = new Tienda();

  constructor(
    public tiposService: TipoOperacionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.tiendaSeleccionada = this.route.snapshot.paramMap.get('tienda');
    this.tienda = new Tienda(JSON.parse(localStorage.getItem("tienda")));
    this.cargando = true;
    this.listarTiposOperacion();
  }

  listarTiposOperacion() {
    this.cargando = true;
    this.tiposService.listarTipos({ tienda: this.tiendaSeleccionada }, this);
  }

  despuesDeListarTipos(data) {
    this.cargando = false;
    this.tipos = data;
  }

}
