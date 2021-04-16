export class TicketProgramado {


    public secuencial: number = 0;
    public codigo_tipo_operacion: string = "";
    public email: string = "";
    public telefono: string = "";
    public recordatorio: boolean = false;
    public rut: string = "";
    public nombres: string = "";
    public hora_cita: number = 0;
    public fecha_sacado: Date = new Date();
    public fecha_cita: Date = null;

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
        this.rut = data.rut ? data.rut : this.rut;
        this.nombres = data.nombres ? data.nombres : this.nombres;
        this.hora_cita = data.hora_cita ? data.hora_cita : this.hora_cita;
        this.fecha_cita = data.fecha_cita ? data.fecha_cita : this.fecha_cita;
    }

}