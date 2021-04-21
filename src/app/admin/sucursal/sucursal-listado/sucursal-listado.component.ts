import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { SucursalService } from '../sucursal.service';

@Component({
  selector: 'app-sucursal-listado',
  templateUrl: './sucursal-listado.component.html'
})
export class SucursalListadoComponent implements OnInit {

  sucursales: any = new Array();
  cargando: boolean = false;
  seleccionado: Sucursal = new Sucursal();

  constructor(
    public toastr: ToastrService,
    public sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.listarSucursales();
  }

  listarSucursales() {
    this.cargando = true;
    this.sucursalService.listarSucursales({}, this);
  }

  despuesDeListarSucursales(data) {
    this.cargando = false;
    this.sucursales = data;
  }

  eliminar() {
    this.cargando = true;
    this.sucursalService.eliminarSucursal({ codigo: this.seleccionado.codigo, tabla: 'sucursal' }, this);
  }

  despuesDeEliminarSucursal(data) {
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarSucursales();
    this.cargando = false;
  }

  cerrar() {
    document.getElementById("modal").hidden = true;
  }

  abrir(sucursal) {
    this.seleccionado = sucursal;
    document.getElementById("modal").hidden = false;
  }

}
