import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/entidades/Usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.css']
})
export class UsuarioListadoComponent implements OnInit {

  usuarios: any = new Array();
  cargando: boolean = false;
  seleccionado: Usuario = new Usuario();

  constructor(
    public toastr: ToastrService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.cargando = true;
    this.usuarioService.listarUsuarios({}, this);
  }

  despuesDeListarUsuarios(data) {
    this.usuarios = data;
    this.cargando = false;
  }

  eliminar() {
    this.cargando = true;
    this.usuarioService.eliminarUsuario({ username: this.seleccionado.username, tabla: 'usuario' }, this);
  }

  despuesDeEliminarUsuario(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarUsuarios();
  }

  cerrar() {
    document.getElementById("modal").hidden = true;
  }

  abrir(usuario) {
    this.seleccionado = usuario;
    document.getElementById("modal").hidden = false;
  }

}
