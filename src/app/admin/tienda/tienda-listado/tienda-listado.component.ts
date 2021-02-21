import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-tienda-listado',
  templateUrl: './tienda-listado.component.html',
  styleUrls: ['./tienda-listado.component.css']
})
export class TiendaListadoComponent implements OnInit {

  tiendas: any = new Array();

  constructor(
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.listarTiendas();
  }

  listarTiendas() {
    this.tiendaService.listarTiendas({}, this);
  }

  despuesDeListarTiendas(data) {
    console.log(data);
    this.tiendas = data;
  }

}
