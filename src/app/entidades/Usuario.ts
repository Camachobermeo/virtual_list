export class Usuario {
    public rut_empresa: string = "";
    public nombre: string = "";
    public apellidos: string = "";
    public username: string = "";
    public telefono: string = "";
    public clave: string = "";
    public estado: boolean = true;
    public codigo_sucursal: string = "";
    public ventanilla: string = "";
    public tipo_usuario: string = "";

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.rut_empresa = data.rut_empresa ? data.rut_empresa : this.rut_empresa;
        this.nombre = data.nombre ? data.nombre : this.nombre;
        this.apellidos = data.apellidos ? data.apellidos : this.apellidos;
        this.username = data.username ? data.username : this.username;
        this.telefono = data.telefono ? data.telefono : this.telefono;
        this.clave = data.clave ? data.clave : this.clave;
        this.estado = data.estado ? data.estado : this.estado;
        this.codigo_sucursal = data.codigo_sucursal ? data.codigo_sucursal : this.codigo_sucursal;
        this.ventanilla = data.ventanilla ? data.ventanilla : this.ventanilla;
        this.tipo_usuario = data.tipo_usuario ? data.tipo_usuario : this.tipo_usuario;
    }

}