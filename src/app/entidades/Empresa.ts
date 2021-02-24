export class Empresa {
    public rut: string = "";
    public razon_social: string = "";

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.rut = data.rut ? data.rut : this.rut;
        this.razon_social = data.razon_social ? data.razon_social : this.razon_social;
    }

}