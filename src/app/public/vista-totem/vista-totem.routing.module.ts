import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaTotemComponent } from './vista-totem.component';

const routesModulos: Routes = [
  {
    path: '',
    component: VistaTotemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModulos)],
  exports: [RouterModule]
})
export class VistaRoutingModule { }
