import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/entidades/Empresa';
import { UtilService } from 'src/app/servicios/util.service';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {

  empresa: Empresa = new Empresa();
  cargando: boolean = false;

  constructor(
    private router: Router,
    public empresaService: EmpresaService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
  }

  obtenerEmpresa() {
    this.cargando = true;
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.cargando = false;
  }

  guardarEmpresa(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.empresaService.guardarEmpresa(this.empresa, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarEmpresa(data) {
    this.toastr.success(data.mensaje, "Aviso");
    this.cargando = false;
    this.router.navigate(['admin/empresa']);
  }

}
