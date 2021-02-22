export class Tienda {
    public codigo: string = "";
    public rut: string = "";
    public direccion: string = "";
    public telefono: string = "";
    public l_inicio_atencion: string = "";
    public l_fin_atencion: string = "";
    public m_inicio_atencion: string = "";
    public m_fin_atencion: string = "";
    public mm_inicio_atencion: string = "";
    public mm_fin_atencion: string = "";
    public j_inicio_atencion: string = "";
    public j_fin_atencion: string = "";
    public v_inicio_atencion: string = "";
    public v_fin_atencion: string = "";
    public s_inicio_atencion: string = "";
    public s_fin_atencion: string = "";
    public d_inicio_atencion: string = "";
    public d_fin_atencion: string = "";

    constructor(data?) {
        data ? this.hydrate(data) : null;
    }

    hydrate(data) {
        this.codigo = data.codigo ? data.codigo : this.codigo;
        this.rut = data.rut ? data.rut : this.rut;
        this.direccion = data.direccion ? data.direccion : this.direccion;
        this.telefono = data.telefono ? data.telefono : this.telefono;
        this.telefono = data.telefono ? data.telefono : this.telefono;
        this.l_inicio_atencion = data.l_inicio_atencion ? data.l_inicio_atencion : this.l_inicio_atencion;
        this.l_fin_atencion = data.l_fin_atencion ? data.l_fin_atencion : this.l_fin_atencion;
        this.m_inicio_atencion = data.m_inicio_atencion ? data.m_inicio_atencion : this.m_inicio_atencion;
        this.m_fin_atencion = data.m_fin_atencion ? data.m_fin_atencion : this.m_fin_atencion;
        this.mm_inicio_atencion = data.mm_inicio_atencion ? data.mm_inicio_atencion : this.mm_inicio_atencion;
        this.mm_fin_atencion = data.mm_fin_atencion ? data.mm_fin_atencion : this.mm_fin_atencion;
        this.j_inicio_atencion = data.j_inicio_atencion ? data.j_inicio_atencion : this.j_inicio_atencion;
        this.j_fin_atencion = data.j_fin_atencion ? data.j_fin_atencion : this.j_fin_atencion;
        this.v_inicio_atencion = data.v_inicio_atencion ? data.v_inicio_atencion : this.v_inicio_atencion;
        this.v_fin_atencion = data.v_fin_atencion ? data.v_fin_atencion : this.v_fin_atencion;
        this.s_inicio_atencion = data.s_inicio_atencion ? data.s_inicio_atencion : this.s_inicio_atencion;
        this.s_fin_atencion = data.s_fin_atencion ? data.s_fin_atencion : this.s_fin_atencion;
        this.d_inicio_atencion = data.d_inicio_atencion ? data.d_inicio_atencion : this.d_inicio_atencion;
        this.d_fin_atencion = data.d_fin_atencion ? data.d_fin_atencion : this.d_fin_atencion;
    }

}