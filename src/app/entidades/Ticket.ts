export class Ticket {
    public secuencial: number = 0;
    public codigo_tipo_operacion: string = "";
    public email: string = "";
    public telefono: string = "";
    public recordatorio: boolean = false;
    public fecha_sacado: Date = new Date();

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.secuencial = data.secuencial ? data.secuencial : this.secuencial;
        this.codigo_tipo_operacion = data.codigo_tipo_operacion ? data.codigo_tipo_operacion : this.codigo_tipo_operacion;
        this.email = data.email ? data.email : this.email;
        this.telefono = data.telefono ? data.telefono : this.telefono;
        this.recordatorio = data.recordatorio ? data.recordatorio : this.recordatorio;
        this.fecha_sacado = data.fecha_sacado ? data.fecha_sacado : this.fecha_sacado;
    }

}