export class TotemFila {
    public codigo_totem: string = "";
    public codigo_fila: string = "";
    public estado: boolean = false;

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.codigo_totem = data.codigo_totem ? data.codigo_totem : this.codigo_totem;
        this.codigo_fila = data.codigo_fila ? data.codigo_fila : this.codigo_fila;
        this.estado = data.estado ? data.estado : this.estado;
    }

}