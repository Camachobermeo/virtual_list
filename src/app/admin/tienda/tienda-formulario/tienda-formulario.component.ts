import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tienda } from 'src/app/entidades/Tienda';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-tienda-formulario',
  templateUrl: './tienda-formulario.component.html',
  styleUrls: ['./tienda-formulario.component.css']
})
export class TiendaFormularioComponent implements OnInit {

  tienda: Tienda = new Tienda ();
  cargando: boolean = false;
  esEdicion: boolean = false;

  constructor(
    private router: Router,
    public tiendaService: TiendaService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.tienda.codigo = this.route.snapshot.paramMap.get("codigo");
    if (this.tienda.codigo) {
      this.esEdicion = true;
      this.obtenerTienda();
    }
  }

  obtenerTienda() {
    this.tiendaService.obtenerTienda({ codigo: this.tienda.codigo }, this);
  }

  despuesDeObtenerTienda(data) {
    this.tienda = data;
  }
  activarCargando() {
    document.getElementById("cargando").hidden = false;
  }

  guardarTienda(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.tienda.rut = environment.empresa;
      if (this.esEdicion) {
        this.tienda['esEdicion'] = true;
      }else {
        this.tienda['esEdicion'] = false;
      }
      this.tiendaService.guardarTienda(this.tienda, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarTienda(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['tienda']);
  }

}
