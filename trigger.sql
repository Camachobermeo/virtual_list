-- Function: actualizar_numero_ticket()

-- DROP FUNCTION actualizar_numero_ticket();

CREATE OR REPLACE FUNCTION actualizar_numero_ticket()
  RETURNS trigger AS
$BODY$
  DECLARE
      nRegistrosAfectados integer;
      numeroUltimaSecuencia integer;
  BEGIN
	IF TG_OP='INSERT' THEN
		EXECUTE $$SELECT numero
		FROM numeracion
		WHERE codigo_tipo_operacion = $1 AND
		      fecha = $2$$
		INTO numeroUltimaSecuencia
		USING NEW.codigo_tipo_operacion, DATE(NEW.fecha_sacado);

		numeroUltimaSecuencia := COALESCE(numeroUltimaSecuencia,1);
		
		EXECUTE $$UPDATE numeracion
		     SET numero = $3
		     WHERE codigo_tipo_operacion = $1 AND
			   fecha = $2$$
		USING NEW.codigo_tipo_operacion, DATE(NEW.fecha_sacado), (numeroUltimaSecuencia+1);

		GET DIAGNOSTICS nRegistrosAfectados = ROW_COUNT;

		IF nRegistrosAfectados=0 THEN
			EXECUTE $$INSERT INTO numeracion(codigo_tipo_operacion, fecha, numero)
				VALUES ($1, $2, $3)$$
			USING NEW.codigo_tipo_operacion, DATE(NEW.fecha_sacado), (numeroUltimaSecuencia);
		END IF;

		NEW.numeracion := numeroUltimaSecuencia;
		
		RETURN NEW;
	END IF;
    END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;