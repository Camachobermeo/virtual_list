export class TipoOperacion {
    public codigo: string = "";
    public codigo_totem: string = "";
    public descripcion: string = "";

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.codigo = data.codigo ? data.codigo : this.codigo;
        this.codigo_totem = data.codigo_totem ? data.codigo_totem : this.codigo_totem;
        this.descripcion = data.descripcion ? data.descripcion : this.descripcion;
    }

}