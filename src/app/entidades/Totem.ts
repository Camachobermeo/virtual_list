export class Totem {
    public codigo: string = "";
    public codigo_tienda: string = "";
    public ubicacion: string = "";

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.codigo = data.codigo ? data.codigo : this.codigo;
        this.codigo_tienda = data.codigo_tienda ? data.codigo_tienda : this.codigo_tienda;
        this.ubicacion = data.ubicacion ? data.ubicacion : this.ubicacion;
    }

}