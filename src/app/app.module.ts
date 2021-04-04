import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiRequestService } from './servicios/api-request.service';
import { AppConfig } from './servicios/app-config';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilService } from './servicios/util.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from './componentes-generales/componentes-generales.module';
import { AuthGuardService } from './servicios/auth-guard.service';
import { MenuResolve } from './servicios/menu.resolve';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ComponentesGeneralesModule,
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [ApiRequestService, AppConfig, UtilService, AuthGuardService, MenuResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
