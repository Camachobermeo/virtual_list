export class TicketProgramado {


    public secuencial: number = 0;
    public codigo_fila: string = "";
    public email: string = "";
    public telefono: string = "";
    public recordatorio: boolean = false;
    public rut: string = "";
    public nombres: string = "";
    public hora_cita: number = null;
    public fecha_sacado: Date = new Date();
    public fecha_cita: Date = null;
    public inicio_atencion: Date = null;
    public fin_atencion: Date = null;
    public numeracion: number = 0;

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.secuencial = data.secuencial ? data.secuencial : this.secuencial;
        this.codigo_fila = data.codigo_fila ? data.codigo_fila : this.codigo_fila;
        this.email = data.email ? data.email : this.email;
        this.telefono = data.telefono ? data.telefono : this.telefono;
        this.recordatorio = data.recordatorio ? data.recordatorio : this.recordatorio;
        this.fecha_sacado = data.fecha_sacado ? data.fecha_sacado : this.fecha_sacado;
        this.rut = data.rut ? data.rut : this.rut;
        this.nombres = data.nombres ? data.nombres : this.nombres;
        this.hora_cita = data.hora_cita ? data.hora_cita : this.hora_cita;
        this.fecha_cita = data.fecha_cita ? data.fecha_cita : this.fecha_cita;
        this.inicio_atencion = data.inicio_atencion ? data.inicio_atencion : this.inicio_atencion;
        this.fin_atencion = data.fin_atencion ? data.fin_atencion : this.fin_atencion;
        this.numeracion = data.numeracion ? data.numeracion : this.numeracion;
    }

}