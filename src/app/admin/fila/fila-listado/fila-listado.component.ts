import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Fila } from 'src/app/entidades/Fila';
import { SucursalService } from '../../sucursal/sucursal.service';
import { FilaService } from '../fila.service';

@Component({
  selector: 'app-fila-listado',
  templateUrl: './fila-listado.component.html'
})
export class FilaListadoComponent implements OnInit {

  filas: any = new Array();
  sucursales: any = new Array();
  sucursalSeleccionada: string = "";
  cargando: boolean = false;
  seleccionado: Fila = new Fila();


  constructor(
    public filaService: FilaService,
    public toastr: ToastrService,
    public sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.sucursalService.listarSucursales({}, this);
  }

  listarFilas() {
    this.cargando = true;
    this.filaService.listarFilas({ sucursal: this.sucursalSeleccionada }, this);
  }

  despuesDeListarFilas(data) {
    this.filas = data;
    this.cargando = false;
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.sucursalSeleccionada = this.sucursales[0] && this.sucursales[0].codigo;
    if (this.sucursalSeleccionada) {
      this.listarFilas();
    } else
      this.cargando = false;
  }

  eliminar() {
    this.cargando = true;
    this.filaService.eliminarFila({ codigo: this.seleccionado.codigo, tabla: 'fila' }, this);
  }

  despuesDeEliminarFila(data) {
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarFilas();
    this.cargando = false;

  }

  cerrar() {
    document.getElementById("modal").hidden = true;
  }

  abrir(fila) {
    this.seleccionado = fila;
    document.getElementById("modal").hidden = false;
  }

}
