export class Totem {
    public codigo: string = "";
    public codigo_sucursal: string = "";
    public ubicacion: string = "";

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.codigo = data.codigo ? data.codigo : this.codigo;
        this.codigo_sucursal = data.codigo_sucursal ? data.codigo_sucursal : this.codigo_sucursal;
        this.ubicacion = data.ubicacion ? data.ubicacion : this.ubicacion;
    }

}