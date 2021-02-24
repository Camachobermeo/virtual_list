import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css']
})
export class UsuarioFormularioComponent implements OnInit {

  usuario: Usuario = new Usuario ();
  cargando: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  guardarUsuario(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.usuario.rut = environment.empresa;
      this.usuarioService.guardarUsuario(this.usuario, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarUsuario(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
  }

}
