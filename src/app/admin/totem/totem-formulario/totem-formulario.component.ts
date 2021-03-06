import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fila } from 'src/app/entidades/Fila';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { Totem } from 'src/app/entidades/Totem';
import { TotemFila } from 'src/app/entidades/TotemFila';
import { UtilService } from 'src/app/servicios/util.service';
import { FilaService } from '../../fila/fila.service';
import { SucursalService } from '../../sucursal/sucursal.service';
import { TotemService } from '../totem.service';

@Component({
  selector: 'app-totem-formulario',
  templateUrl: './totem-formulario.component.html',
  styleUrls: ['./totem-formulario.component.css']
})
export class TotemFormularioComponent implements OnInit {

  sucursales: Array<Sucursal> = new Array();
  totem: Totem = new Totem();
  cargando: boolean = false;
  esEdicion: boolean = false;
  filas: Array<Fila> = new Array();
  totemFilas: Array<TotemFila> = new Array();

  constructor(
    private router: Router,
    public sucursalService: SucursalService,
    public totemService: TotemService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public filaService: FilaService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.totem.codigo = this.route.snapshot.paramMap.get("codigo");
    if (this.totem.codigo) {
      this.esEdicion = true;
      this.obtenerTotem();
    } else {
      this.sucursalService.listarSucursales({}, this);
    }
  }

  obtenerTotem() {
    this.cargando = true;
    this.totemService.obtenerTotem({ codigo: this.totem.codigo }, this);
  }

  despuesDeObtenerTotem(data) {
    this.totem = new Totem(data.resultado);
    this.totemFilas = data.filas || new Array();
    this.sucursalService.listarSucursales({}, this);
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.totem.codigo_sucursal = this.totem.codigo_sucursal || (this.sucursales[0] && this.sucursales[0].codigo);
    this.listarFilas();
  }

  listarFilas() {
    this.cargando = true;
    this.filas = new Array();
    this.filaService.listarFilas({ sucursal: this.totem.codigo_sucursal }, this);
  }

  despuesDeListarFilas(data) {
    this.filas = data;
    if (this.filas) {
      if (!this.esEdicion) {
        this.filas.forEach(element => {
          element['seleccionado'] = true;
        });
      } else {
        if (this.totemFilas) {
          this.filas.forEach(element => {
            let encontrado = this.totemFilas.find(tf => tf.codigo_fila == element.codigo);
            if (encontrado)
              element['seleccionado'] = true;
          });
        }
      }
    }
    this.cargando = false;
  }

  guardarTotem(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      if (this.esEdicion) {
        this.totem['esEdicion'] = true;
      } else {
        this.totem['esEdicion'] = false;
      }
      let totemFila: Array<TotemFila> = new Array();
      if (this.filas) {
        this.filas.forEach(element => {
          if (element['seleccionado']) {
            let tf = new TotemFila();
            tf.codigo_totem = this.totem.codigo;
            tf.codigo_fila = element.codigo;
            tf.estado = true;
            totemFila.push(tf);
          }
        });
      }
      this.totem['filas'] = totemFila;
      this.totemService.guardarTotem(this.totem, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarTotem(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['admin/totem']);
  }

}
