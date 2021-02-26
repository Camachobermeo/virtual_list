import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tienda } from 'src/app/entidades/Tienda';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-tienda-listado',
  templateUrl: './tienda-listado.component.html',
  styleUrls: ['./tienda-listado.component.css']
})
export class TiendaListadoComponent implements OnInit {

  tiendas: any = new Array();
  cargando: boolean = false;
  seleccionado: Tienda = new Tienda();

  constructor(
    public toastr: ToastrService,
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.listarTiendas();
  }

  listarTiendas() {
    this.cargando = true;
    this.tiendaService.listarTiendas({}, this);
  }

  despuesDeListarTiendas(data) {
    this.cargando = false;
    this.tiendas = data;
  }

  eliminar() {
    this.cargando = true;
    this.tiendaService.eliminarTienda({ codigo: this.seleccionado.codigo, tabla: 'tienda' }, this);
  }

  despuesDeEliminarTienda(data) {
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarTiendas();
    this.cargando = false;
  }

}
