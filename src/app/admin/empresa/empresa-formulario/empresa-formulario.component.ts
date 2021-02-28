import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/entidades/Empresa';
import { UtilService } from 'src/app/servicios/util.service';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-empresa-formulario',
  templateUrl: './empresa-formulario.component.html',
  styleUrls: ['./empresa-formulario.component.css']
})
export class EmpresaFormularioComponent implements OnInit {

  empresa: Empresa = new Empresa();
  cargando: boolean = false;

  constructor(
    public empresaService: EmpresaService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
  }

}
