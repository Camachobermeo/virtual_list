import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nombreUsuario = "";
  test = "";
  ocultarMenu = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem("codigo");
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  cerraNav() {
    this.ocultarMenu = !this.ocultarMenu;
    if (this.ocultarMenu) {
      document.getElementById("cuerpo").classList.add('closed-sidebar');
      document.getElementById("cuerpo").classList.add('sidebar-mobile-open');
      document.getElementById("menu").classList.add('is-active');
      document.getElementById("menuMovil").classList.add('is-active');
    } else {
      document.getElementById("cuerpo").classList.remove('closed-sidebar');
      document.getElementById("cuerpo").classList.remove('sidebar-mobile-open');
      document.getElementById("menu").classList.remove('is-active');
      document.getElementById("menuMovil").classList.remove('is-active');
    }
  }

}
