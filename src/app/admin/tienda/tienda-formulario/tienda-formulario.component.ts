import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-formulario',
  templateUrl: './tienda-formulario.component.html',
  styleUrls: ['./tienda-formulario.component.css']
})
export class TiendaFormularioComponent implements OnInit {

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  activarCargando() {
    document.getElementById("cargando").hidden = false;
  }

  guardar() {
    this.router.navigate(["tienda"]);
  }
}
