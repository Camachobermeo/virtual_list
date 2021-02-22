import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../tienda/tienda.service';
import { TotemService } from '../../totem/totem.service';

@Component({
  selector: 'app-tipo-operacion-formulario',
  templateUrl: './tipo-operacion-formulario.component.html',
  styleUrls: ['./tipo-operacion-formulario.component.css']
})
export class TipoOperacionFormularioComponent implements OnInit {

  tiendas: any = new Array();
  totems: any = new Array();
  tiendaSeleccionada: string = "";
  totemSeleccionado: string = "";

  constructor(
    public tiendaService: TiendaService,
    public totemService: TotemService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }
  despuesDeListarTiendas(data) {
    this.tiendas = data;
  }

  listarTotems() {
    this.totemService.listarTotems({ tienda: this.tiendaSeleccionada }, this);
  }
  despuesDeListarTotems(data) {
    this.totems = data;
  }

}
