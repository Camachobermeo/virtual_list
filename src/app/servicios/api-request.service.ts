import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from './app-config';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface ObjetoJWT {
    userId: string;
    token: string;
}

@Injectable()
export class ApiRequestService {

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
        private router: Router
    ) { }

    appendAuthHeader(): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        // let objJWT: ObjetoJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
        // if (objJWT != null) {
        //     let token = objJWT.token;
        //     if (token != null) {
        //         headers.append("Authorization", token);
        //     }
        // }
        return headers;
    }

    getRequestOptions(urlParam?: HttpParams, body?: any): any {
        let empresa = localStorage.getItem('empresa');
        let options = {
            headers: this.appendAuthHeader()
        };
        if (urlParam) {
            options['params'] = urlParam;
        }
        if (body) {
            // body["sisInfoTO"] = JSON.parse(localStorage.getItem(LS.KEY_SISINFOTO));
            // body["sisInfoTO"] ? body["sisInfoTO"].empresa = empresa : null;
            body["empresa"] = empresa;
            options['body'] = JSON.stringify(body);
        }
        return options;
    }

    getRequestOptionsAlternativo(body: any): any {
        let options = {};
        options['body'] = JSON.stringify(body);
        return options;
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    get(url: string, urlParams?: HttpParams): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem("tiempo", "" + new Date().getTime());
            let requestOptions = this.getRequestOptions(urlParams);
            return this.http.request('GET', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    post(url: string, body: any): Promise<any> {
        if (this.hayTiempoSession()) {
        localStorage.setItem("tiempo", "" + new Date().getTime());
        let requestOptions = this.getRequestOptions(undefined, body);
        return this.http.request('POST', this.appConfig.baseApiPath + url, requestOptions)
            .toPromise()
            .then(resp => resp)
            .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    postSinLogin(url: string, body: any): Promise<any> {
        let requestOptions = this.getRequestOptions(undefined, body);
        return this.http.request('POST', this.appConfig.baseApiPath + url, requestOptions)
            .toPromise()
            .then(resp => resp)
            .catch(err => this.handleError(err));
    }

    postAternativo(url: string, body: any): Promise<any> {
        let requestOptions = this.getRequestOptionsAlternativo(body);
        return this.http.request('POST', url, requestOptions)
            .toPromise()
            .then(resp => resp)
            .catch(err => this.handleError(err));
    }

    getAternativo(url: string): Promise<any> {
        let requestOptions = this.getRequestOptionsAlternativo({});
        return this.http.request('GET', url, requestOptions)
            .toPromise()
            .then(resp => resp)
            .catch(err => this.handleError(err));
    }

    //login
    login(url: string, body: any): Promise<any> {
        localStorage.setItem("tiempo", "" + new Date().getTime());
        let requestOptions = this.getRequestOptions(undefined, body);
        return this.http.request('POST', this.appConfig.baseApiPath + url, requestOptions)
            .toPromise()
            .then(resp => resp)
            .catch(err => this.handleError(err));
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    put(url: string, body: any): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem("tiempo", "" + new Date().getTime());
            let requestOptions = this.getRequestOptions(undefined, body);
            return this.http.request('PUT', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    delete(url: string): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem("tiempo", "" + new Date().getTime());
            let requestOptions = this.getRequestOptions();
            return this.http.request('DELETE', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    hayTiempoSession() {
        if (localStorage.getItem("locationPathName") != location.pathname) {
            return false;
        }
        let fecha = localStorage.getItem("tiempo");
        if (new Date().getTime() - Number(fecha) > 18000000) {
            return false;
        }
        return true;
    }

    cerrarSession() {
        // this.autenticacionService.logout();
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(["/login"]);
        location.reload();
    }
}
