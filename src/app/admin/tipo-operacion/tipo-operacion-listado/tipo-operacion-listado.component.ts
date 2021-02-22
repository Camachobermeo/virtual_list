import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../tienda/tienda.service';
import { TipoOperacionService } from '../tipo-operacion.service';

@Component({
  selector: 'app-tipo-operacion-listado',
  templateUrl: './tipo-operacion-listado.component.html',
  styleUrls: ['./tipo-operacion-listado.component.css']
})
export class TipoOperacionListadoComponent implements OnInit {

  tipos: any = new Array();
  tiendas: any = new Array();
  tiendaSeleccionada: string = "";

  constructor(
    public tipoService: TipoOperacionService,
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }
  listarTipos() {
    this.tipoService.listarTipos({tienda:this.tiendaSeleccionada}, this);
  }

  despuesDeListarTipos(data) {
    console.log(data);
    this.tipos = data;
  }
  despuesDeListarTiendas(data) {
    this.tiendas = data;
  }
}
