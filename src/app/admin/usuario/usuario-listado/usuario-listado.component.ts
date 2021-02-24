import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.css']
})
export class UsuarioListadoComponent implements OnInit {

  usuarios: any = new Array();

  constructor(
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
}
