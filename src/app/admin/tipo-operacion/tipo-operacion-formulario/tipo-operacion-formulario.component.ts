import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoOperacion } from 'src/app/entidades/TipoOperacion';
import { UtilService } from 'src/app/servicios/util.service';
import { TiendaService } from '../../tienda/tienda.service';
import { TotemService } from '../../totem/totem.service';
import { TipoOperacionService } from '../tipo-operacion.service';

@Component({
  selector: 'app-tipo-operacion-formulario',
  templateUrl: './tipo-operacion-formulario.component.html',
  styleUrls: ['./tipo-operacion-formulario.component.css']
})
export class TipoOperacionFormularioComponent implements OnInit {

  tiendas: any = new Array();
  totems: any = new Array();
  tipoOperacion: TipoOperacion = new TipoOperacion();
  tiendaSeleccionada: string = "";
  totemSeleccionado: string = "";
  cargando: boolean = false;

  constructor(
    public tiendaService: TiendaService,
    public totemService: TotemService,
    public tipoOperacionService: TipoOperacionService,
    public utilService: UtilService,
    public toastr: ToastrService
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

  guardarTipoOperacion(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.tipoOperacionService.guardarTipoOperacion(this.tipoOperacion, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarTipoOperacion(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
  }

}
