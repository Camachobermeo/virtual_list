export class Usuario {
    public rut: string = "";
    public nombre: string = "";
    public apellidos: string = "";
    public codigo: string = "";
    public telefono: string = "";
    public clave: string = "";
    public estado: boolean = true;

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.rut = data.rut ? data.rut : this.rut;
        this.nombre = data.nombre ? data.nombre : this.nombre;
        this.apellidos = data.apellidos ? data.apellidos : this.apellidos;
        this.codigo = data.codigo ? data.codigo : this.codigo;
        this.telefono = data.telefono ? data.telefono : this.telefono;
        this.clave = data.clave ? data.clave : this.clave;
        this.estado = data.estado ? data.estado : this.estado;
    }

}