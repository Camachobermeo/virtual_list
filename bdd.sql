--CREATE DATABASE ticket;

 CREATE TABLE empresa(
     rut text not null primary key,
     razon_social text not null
 );

  CREATE TABLE tienda(
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
     CONSTRAINT tienda_fk FOREIGN KEY (rut)
      REFERENCES empresa (rut) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

  CREATE TABLE totem(
     codigo text not null primary key,
     codigo_tienda text not null,
     ubicacion text not null,
     CONSTRAINT totem_fk FOREIGN KEY (codigo_tienda)
      REFERENCES tienda (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

 CREATE TABLE tipo_operacion(
     codigo text not null primary key,
     codigo_totem text not null,
     descripcion text not null,
     CONSTRAINT tipo_operacion_fk FOREIGN KEY (codigo_totem)
      REFERENCES totem (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

CREATE TABLE ticket(
     secuencial serial not null primary key,
     codigo_tipo_operacion text not null,
     email text not null,
     telefono text,
     recordatorio boolean not null default false,
     fecha_sacado timestamp not null,
     rut text not null,
     nombres text not null,
     numeracion integer not null,
     CONSTRAINT ticket_fk FOREIGN KEY (codigo_tipo_operacion)
      REFERENCES tipo_operacion (codigo) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

 CREATE TABLE usuario(
     codigo text not null primary key,
     rut text not null,
     nombre text not null,
     apellidos text not null,
     telefono text not null,
     clave text not null,
     estado boolean not null default true,
     CONSTRAINT usuario_fk FOREIGN KEY (rut)
      REFERENCES empresa (rut) MATCH FULL
      ON UPDATE CASCADE ON DELETE NO ACTION
 );

CREATE TABLE numeracion(
     codigo_tipo_operacion text not null,
     fecha date not null,
     numero integer not null,
     CONSTRAINT numeracion_pk PRIMARY KEY (codigo_tipo_operacion, fecha)
 );


DROP TRIGGER IF EXISTS actualizar_numero_ticket ON ticket;

CREATE TRIGGER actualizar_numero_ticket
  BEFORE INSERT
  ON ticket
  FOR EACH ROW
  EXECUTE PROCEDURE actualizar_numero_ticket();