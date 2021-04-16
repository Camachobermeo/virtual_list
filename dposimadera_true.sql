CREATE TABLE public.cliente
(
  cedula text NOT NULL,
  apellidos text NOT NULL,
  nombre text NOT NULL,
  ciudad text NOT NULL,
  telefono text NOT NULL,
  CONSTRAINT cliente_pkey PRIMARY KEY (cedula)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.cliente
  OWNER TO postgres;


CREATE TABLE public.producto
(
  codigo text NOT NULL,
  nombre text NOT NULL,
  cantidad double precision NOT NULL,
  precio_unitario text NOT NULL,
  tipo text,
  fecha_compra text,
  CONSTRAINT producto_pkey PRIMARY KEY (codigo)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.producto
  OWNER TO postgres;


CREATE TABLE public.venta
(
  numero_factura text NOT NULL,
  cedula text NOT NULL,
  apellidos text NOT NULL,
  nombre text NOT NULL,
  ciudad text NOT NULL,
  telefono text NOT NULL,
  subtotal text NOT NULL,
  iva text NOT NULL,
  valorapagar text NOT NULL,
  CONSTRAINT venta_pk PRIMARY KEY (numero_factura)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.venta
  OWNER TO postgres;


  CREATE TABLE public.venta_detalle
(
  secuencial serial not null,
  codigos text NOT NULL,
  cantidades numeric NOT NULL,
  nombreprod text NOT NULL,
  tipomade text NOT NULL,
  preciouni numeric NOT NULL,
  numero_factura text NOT NULL,
  CONSTRAINT venta_detalle_pkey PRIMARY KEY (secuencial),
  CONSTRAINT venta_detalles_fk FOREIGN KEY (numero_factura)
      REFERENCES public.venta (numero_factura) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.venta_detalle
  OWNER TO postgres;