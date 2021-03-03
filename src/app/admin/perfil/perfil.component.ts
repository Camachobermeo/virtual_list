import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  nombreUsuario = " "
  cargando: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.nombreUsuario = localStorage.getItem("codigo");
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.cargando = true;
    this.usuarioService.obtenerUsuario({ codigo: this.nombreUsuario }, this);
  }

  despuesDeObtenerUsuario(data) {
    this.usuario = data;
    this.cargando = false;
  }

  guardarUsuario(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.usuario.rut = environment.empresa;
      this.usuario['esEdicion'] = true;
      this.usuarioService.guardarUsuario(this.usuario, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarUsuario(data) {
    this.toastr.success(data.mensaje, "Aviso");
    this.cargando = false;
  }

  visualizar() {
    if (document.getElementById("clave")) {
      document.getElementById("clave")['type'] = "text";
      document.getElementById("clave")['id'] = "oculto";
      document.getElementById("abierto").hidden = true;
      document.getElementById("cerrado").hidden = false;
    } else {
      document.getElementById("oculto")['type'] = "password";
      document.getElementById("oculto")['id'] = "clave";
      document.getElementById("abierto").hidden = false;
      document.getElementById("cerrado").hidden = true;
    }
  }

}
