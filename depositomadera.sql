CREATE TABLE venta (
	numero_factura text not null primary key,
	cedula text not null,
	apellidos text not null,
	nombre text not null,
	ciudad text not null,
	telefono text not null
);

CREATE TABLE detalle_venta (
	numero_factura serial not null,
	cedula text not null,
	apellidos text not null,
	nombre text not null,
	ciudad text not null,
	telefono text not null
);

CREATE TABLE cliente (
	cedula text not null primary key,
	apellidos text not null,
	nombre text not null,
	ciudad text not null,
	telefono text not null
);


CREATE TABLE producto (
	codigo text not null primary key,
	nombre text not null,
	cantidad float not null,
	ciudad text not null,
	telefono text not null,
	precio_unitario text not null
);

