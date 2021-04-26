import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-formulario',
  templateUrl: './login-formulario.component.html',
  styleUrls: ['./login-formulario.component.css']
})
export class LoginFormularioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  cargando: boolean = false;
  estado: boolean = false;
  recordarClave: boolean = true;

  constructor(
    private router: Router,
    public loginService: LoginService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuarioRecordar")) || new Usuario();
  }

  iniciar(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.usuario.username = this.usuario.username;
      if (this.recordarClave) {
        this.guardarEnLocal();
      } else {
        localStorage.clear();
      }
      this.loginService.obtenerLogin(this.usuario, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  guardarEnLocal() {
    localStorage.setItem("usuarioRecordar", JSON.stringify(this.usuario));
  }

  despuesDeObtenerLogin(data) {
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['admin/principal']).then(() => {
      window.location.reload();
      this.cargando = false;
    });
    localStorage.setItem("codigo", this.usuario.username);
    localStorage.setItem("usuario", JSON.stringify(data.resultado));
    localStorage.setItem("locationPathName", location.pathname);
    localStorage.setItem("empresa", this.usuario.rut_empresa);
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
