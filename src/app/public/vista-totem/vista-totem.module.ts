import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaTotemComponent } from './vista-totem.component';
import { VistaRoutingModule } from './vista-totem.routing.module';



@NgModule({
  declarations: [VistaTotemComponent],
  imports: [
    CommonModule,
    VistaRoutingModule
  ]
})
export class VistaTotemModule { }
