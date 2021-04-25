export class Empresa {
    public rut: string = "";
    public razon_social: string = "";
    public obligar_persona: boolean = false;
    public obligar_correo: boolean = false;
    public obligar_celular: boolean = false;
    public logo: any = null;
    public cabecera: any = null;
    public menu: any = null;

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.rut = data.rut ? data.rut : this.rut;
        this.razon_social = data.razon_social ? data.razon_social : this.razon_social;
        this.obligar_persona = data.obligar_persona ? data.obligar_persona : this.obligar_persona;
        this.obligar_correo = data.obligar_correo ? data.obligar_correo : this.obligar_correo;
        this.obligar_celular = data.obligar_celular ? data.obligar_celular : this.obligar_celular;
        this.logo = data.logo ? data.logo : this.logo;
        this.cabecera = data.cabecera ? data.cabecera : this.cabecera;
        this.menu = data.menu ? data.menu : this.menu;
    }

}