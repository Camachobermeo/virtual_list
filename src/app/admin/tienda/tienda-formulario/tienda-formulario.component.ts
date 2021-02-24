import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tienda } from 'src/app/entidades/Tienda';
import { UtilService } from 'src/app/servicios/util.service';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-tienda-formulario',
  templateUrl: './tienda-formulario.component.html',
  styleUrls: ['./tienda-formulario.component.css']
})
export class TiendaFormularioComponent implements OnInit {

  tienda: Tienda = new Tienda ();
  cargando: boolean = false;

  constructor(
    private router: Router,
    public tiendaService: TiendaService,
    public utilService: UtilService,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  activarCargando() {
    document.getElementById("cargando").hidden = false;
  }

  guardar() {
    this.router.navigate(["tienda"]);
  }

  guardarTienda(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.tiendaService.guardarTienda(this.tienda, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarTienda(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
  }

}
