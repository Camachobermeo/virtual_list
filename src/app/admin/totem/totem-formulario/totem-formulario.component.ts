import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  esEdicion: boolean = false;

  constructor(
    private router: Router,
    public tiendaService: TiendaService,
    public totemService: TotemService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
    this.totem.codigo = this.route.snapshot.paramMap.get("codigo");
    if (this.totem.codigo) {
      this.esEdicion = true;
      this.obtenerTotem();
    }
  }
  obtenerTotem() {
    this.totemService.obtenerTotem({ codigo: this.totem.codigo }, this);
  }

  despuesDeObtenerTotem(data) {
    this.totem = data;
  }

  activarCargando() {
    document.getElementById("cargando").hidden = false;
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
  }

  guardarTotem(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      if (this.esEdicion) {
        this.totem['esEdicion'] = true;
      }else {
        this.totem['esEdicion'] = false;
      }
      this.totemService.guardarTotem(this.totem, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarTotem(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['totem']);
  }

}
