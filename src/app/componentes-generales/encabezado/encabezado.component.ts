import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  nombreUsuario = " "

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem("codigo")
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
