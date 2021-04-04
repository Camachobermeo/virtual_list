import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  nombreUsuario = "";
  test = "";
  ocultarMenu = false;

  constructor(
    private router: Router,
    private api: AuthGuardService
  ) {
    this.api.getMenuCambio$().subscribe(() => {
      this.ocultarMenu = location.hash == '#/login' || location.hash == '#/';
    });
  }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem("codigo");
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
