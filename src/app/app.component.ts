import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem("codigo");
    this.ocultarMenu = this.route.snapshot.data['ocultarMenu'];

    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      transId: string,
      workQueue: boolean,
      services: number,
      code: string
    };
    this.test = "Transaction Key:" + state.transId + "<br /> Configured:" + state.workQueue + "<br /> Services:" + state.services + "<br /> Code: " + state.code;
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
