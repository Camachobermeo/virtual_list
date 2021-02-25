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
  cargando: boolean;
  seleccionado: Usuario = new Usuario();

  constructor(
    public toastr: ToastrService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }
  listarUsuarios() {
    this.usuarioService.listarUsuarios({}, this);
  }

  despuesDeListarUsuarios(data) {
    console.log(data);
    this.usuarios = data;
  }

  eliminar() {
    this.usuarioService.eliminarUsuario({ codigo: this.seleccionado.codigo, tabla: 'usuario' }, this);
  }

  despuesDeEliminarUsuario(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    document.getElementById("cerrar").click();
    this.listarUsuarios();
  }
}
