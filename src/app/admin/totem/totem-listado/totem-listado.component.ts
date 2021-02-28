import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Totem } from 'src/app/entidades/Totem';
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
  cargando: boolean = false;
  seleccionado: Totem = new Totem();

  constructor(
    public totemService: TotemService,
    public toastr: ToastrService,
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.cargando=true;
    this.tiendaService.listarTiendas({}, this);
  }

  listarTotems() {
    this.cargando=true;
    this.totemService.listarTotems({ tienda: this.tiendaSeleccionada }, this);
  }

  despuesDeListarTotems(data) {
    this.totems = data;
    this.cargando=false;
  }
  despuesDeListarTiendas(data) {
    this.tiendas = data;
    this.cargando=false;
  }

  eliminar() {
    this.cargando=true;
    this.totemService.eliminarTotem({ codigo: this.seleccionado.codigo, tabla: 'totem' }, this);
  }

  despuesDeEliminarTotem(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarTotems();
  }

}
