export class TipoOperacion {
    public codigo: string = "";
    public codigo_totem: string = "";
    public descripcion: string = "";
    public tiempo_estimado_minutos: number = 0;
    public costo_estimado: number = 0;

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.codigo = data.codigo ? data.codigo : this.codigo;
        this.codigo_totem = data.codigo_totem ? data.codigo_totem : this.codigo_totem;
        this.descripcion = data.descripcion ? data.descripcion : this.descripcion;
        this.tiempo_estimado_minutos = data.tiempo_estimado_minutos ? data.tiempo_estimado_minutos : this.tiempo_estimado_minutos;
        this.costo_estimado = data.costo_estimado ? data.costo_estimado : this.costo_estimado;
    }

}