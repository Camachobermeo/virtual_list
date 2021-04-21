import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fila } from 'src/app/entidades/Fila';
import { Totem } from 'src/app/entidades/Totem';
import { UtilService } from 'src/app/servicios/util.service';
import { SucursalService } from '../../sucursal/sucursal.service';
import { TotemService } from '../../totem/totem.service';
import { FilaService } from '../fila.service';

@Component({
  selector: 'app-fila-formulario',
  templateUrl: './fila-formulario.component.html'
})
export class FilaFormularioComponent implements OnInit {

  sucursales: any = new Array();
  totems: any = new Array();
  fila: Fila = new Fila();
  sucursalSeleccionada: string = "";
  totemSeleccionado: string = "";
  cargando: boolean = false;
  esEdicion: boolean = false;

  constructor(
    private router: Router,
    public sucursalService: SucursalService,
    public totemService: TotemService,
    public filaService: FilaService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.sucursalService.listarSucursales({}, this);
    this.fila.codigo = this.route.snapshot.paramMap.get("codigo");
    if (this.fila.codigo) {
      this.esEdicion = true;
      this.obtenerFila();
    }
  }

  obtenerFila() {
    this.cargando = true;
    this.filaService.obtenerFila({ codigo: this.fila.codigo }, this);
  }

  despuesDeObtenerFila(data) {
    this.fila = data;
    this.sucursalSeleccionada = data.codigo_sucursal;
    this.cargando = false;
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.sucursalSeleccionada = this.sucursalSeleccionada || (this.sucursales[0] && this.sucursales[0].codigo);
    this.cargando = false;
  }

  guardarFila(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      if (this.esEdicion) {
        this.fila['esEdicion'] = true;
      } else {
        this.fila['esEdicion'] = false;
      }
      this.filaService.guardarFila(this.fila, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarFila(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['admin/fila']);
  }

}
