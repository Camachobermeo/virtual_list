import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoOperacion } from 'src/app/entidades/TipoOperacion';
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
  cargando: boolean = false;
  seleccionado: TipoOperacion = new TipoOperacion();


  constructor(
    public tipoService: TipoOperacionService,
    public toastr: ToastrService,
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.tiendaService.listarTiendas({}, this);
  }

  listarTipos() {
    this.cargando = true;
    this.tipoService.listarTipos({ tienda: this.tiendaSeleccionada }, this);
  }

  despuesDeListarTipos(data) {
    console.log(data);
    this.tipos = data;
    this.cargando = false;
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    this.tiendaSeleccionada = this.tiendas[0] && this.tiendas[0].codigo;
    if (this.tiendaSeleccionada) {
      this.listarTipos();
    } else
      this.cargando = false;
  }

  eliminar() {
    this.cargando = true;
    this.tipoService.eliminarTipoOperacion({ codigo: this.seleccionado.codigo, tabla: 'tipo_operacion' }, this);
  }

  despuesDeEliminarTipoOperacion(data) {
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarTipos();
    this.cargando = false;

  }

}
