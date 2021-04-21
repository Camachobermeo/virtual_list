--CREATE DATABASE ticket;

 CREATE TABLE empresa(
     rut text not null primary key,
     razon_social text not null
 );

  CREATE TABLE sucursal(
     codigo text not null primary key,
     rut text not null,
     direccion text not null,
     telefono text,
     l_inicio_atencion time,
     l_fin_atencion time,
     m_inicio_atencion time,
     m_fin_atencion time,
     mm_inicio_atencion time,
     mm_fin_atencion time,
     j_inicio_atencion time,
     j_fin_atencion time,
     v_inicio_atencion time,
     v_fin_atencion time,
     s_inicio_atencion time,
     s_fin_atencion time,
     d_inicio_atencion time,
     d_fin_atencion time,
     CONSTRAINT sucursal_fk FOREIGN KEY (rut)
      REFERENCES empresa (rut) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

  CREATE TABLE totem(
     codigo text not null primary key,
     codigo_sucursal text not null,
     ubicacion text not null,
     CONSTRAINT totem_fk FOREIGN KEY (codigo_sucursal)
      REFERENCES sucursal (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

 CREATE TABLE fila(
     codigo text not null primary key,
     codigo_sucursal text not null,
     descripcion text not null,
     CONSTRAINT fila_fk FOREIGN KEY (codigo_sucursal)
      REFERENCES sucursal (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

 ALTER TABLE fila
 add column tiempo_estimado_minutos integer,
 add column costo_estimado numeric;

  CREATE TABLE totem_fila(
    secuencial serial not null primary key,
    codigo_totem text not null,
    codigo_fila text not null,
    estado boolean not null default false,
    CONSTRAINT totem_fila_fila_fk FOREIGN KEY (codigo_fila)
      REFERENCES fila (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT totem_fila_totem_fk FOREIGN KEY (codigo_totem)
      REFERENCES totem (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

CREATE TABLE ticket(
     secuencial serial not null primary key,
     codigo_fila text not null,
     email text not null,
     telefono text,
     recordatorio boolean not null default false,
     fecha_sacado timestamp not null,
     rut text not null,
     nombres text not null,
     numeracion integer not null,
     CONSTRAINT ticket_fk FOREIGN KEY (codigo_fila)
      REFERENCES fila (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

 ALTER TABLE ticket
 add column estado text;

 CREATE TABLE usuario(
     username text not null primary key,
     rut_empresa text not null,
     nombre text not null,
     apellidos text not null,
     telefono text not null,
     clave text not null,
     estado boolean not null default true,
     CONSTRAINT usuario_fk FOREIGN KEY (rut_empresa)
      REFERENCES empresa (rut) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );


CREATE TABLE numeracion(
     codigo_fila text not null,
     fecha date not null,
     numero integer not null,
     CONSTRAINT numeracion_pk PRIMARY KEY (codigo_fila, fecha)
 );

CREATE TABLE ticket_programado(
     secuencial serial not null primary key,
     codigo_fila text not null,
     email text not null,
     telefono text,
     recordatorio boolean not null default false,
     fecha_sacado timestamp not null,
     fecha_cita date not null,
     hora_cita time not null,
     rut text not null,
     nombres text not null,
     CONSTRAINT ticket_fk FOREIGN KEY (codigo_fila)
      REFERENCES fila (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

 ALTER TABLE ticket_programado
 add column estado text;

DROP TRIGGER IF EXISTS actualizar_numero_ticket ON ticket;

CREATE TRIGGER actualizar_numero_ticket
  BEFORE INSERT
  ON ticket
  FOR EACH ROW
  EXECUTE PROCEDURE actualizar_numero_ticket();

 ALTER TABLE usuario
 add column codigo_sucursal text,
 add column ventanilla text,
 add CONSTRAINT usuario_sucursal_fk FOREIGN KEY (codigo_sucursal)
     REFERENCES sucursal (codigo) MATCH FULL
     ON UPDATE CASCADE ON DELETE NO ACTION;

 ALTER TABLE usuario
 add column tipo_usuario text;

 ALTER TABLE ticket
 ADD COLUMN usuario text,
  add CONSTRAINT usuario_ticket_fk FOREIGN KEY (usuario)
     REFERENCES usuario (username) MATCH FULL
     ON UPDATE CASCADE ON DELETE NO ACTION;