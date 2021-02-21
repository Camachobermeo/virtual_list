import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../tienda/tienda.service';
import { TotemService } from '../totem.service';

@Component({
  selector: 'app-totem-listado',
  templateUrl: './totem-listado.component.html',
  styleUrls: ['./totem-listado.component.css']
})
export class TotemListadoComponent implements OnInit {

  totems: any = new Array();
  tiendas: any = new Array();
  tiendaSeleccionada: string = "";

  constructor(
    public totemService: TotemService,
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }

  listarTotems() {
    this.totemService.listarTotems({ tienda:this.tiendaSeleccionada }, this);
  }

  despuesDeListarTotems(data) {
    console.log(data);
    this.totems = data;
  }
  despuesDeListarTiendas(data) {
    this.tiendas = data;
  }

}
