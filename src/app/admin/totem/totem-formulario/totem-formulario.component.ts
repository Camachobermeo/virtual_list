import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Totem } from 'src/app/entidades/Totem';
import { UtilService } from 'src/app/servicios/util.service';
import { TiendaService } from '../../tienda/tienda.service';
import { TotemService } from '../totem.service';

@Component({
  selector: 'app-totem-formulario',
  templateUrl: './totem-formulario.component.html',
  styleUrls: ['./totem-formulario.component.css']
})
export class TotemFormularioComponent implements OnInit {

  tiendas: any = new Array();
  tiendaSeleccionada: string = "";
  totem: Totem = new Totem ();
  cargando: boolean = false;

  constructor(
    private router: Router,
    public tiendaService: TiendaService,
    public totemService: TotemService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }

  activarCargando() {
    document.getElementById("cargando").hidden = false;
  }

  guardar() {
    this.router.navigate(["totem"]);
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
  }

  guardarTotem(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.totemService.guardarTotem(this.totem, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarTotem(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
  }

}
