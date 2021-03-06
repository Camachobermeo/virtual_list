import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { Totem } from 'src/app/entidades/Totem';
import { SucursalService } from '../../sucursal/sucursal.service';
import { TotemService } from '../totem.service';

@Component({
  selector: 'app-totem-listado',
  templateUrl: './totem-listado.component.html',
  styleUrls: ['./totem-listado.component.css']
})
export class TotemListadoComponent implements OnInit {

  totems: any = new Array();
  sucursales: Array<Sucursal> = new Array();
  sucursalSeleccionada: string = "";
  cargando: boolean = false;
  seleccionado: Totem = new Totem();

  constructor(
    public totemService: TotemService,
    public toastr: ToastrService,
    public sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.sucursalService.listarSucursales({}, this);
  }

  listarTotems() {
    this.cargando = true;
    this.totemService.listarTotems({ sucursal: this.sucursalSeleccionada }, this);
  }

  despuesDeListarTotems(data) {
    this.totems = data;
    this.cargando = false;
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.sucursalSeleccionada = this.sucursales[0] && this.sucursales[0].codigo;
    if (this.sucursalSeleccionada) {
      this.listarTotems();
    } else
      this.cargando = false;
  }

  eliminar() {
    this.cargando = true;
    this.totemService.eliminarTotem({ codigo: this.seleccionado.codigo, tabla: 'totem' }, this);
  }

  despuesDeEliminarTotem(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarTotems();
  }

  cerrar() {
    document.getElementById("modal").hidden = true;
  }

  abrir(totem) {
    this.seleccionado = totem;
    document.getElementById("modal").hidden = false;
  }

}
