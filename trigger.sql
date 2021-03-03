-- Function: actualizar_numero_ticket()

-- DROP FUNCTION actualizar_numero_ticket();

CREATE OR REPLACE FUNCTION actualizar_numero_ticket()
  RETURNS trigger AS
$BODY$
  DECLARE
      nRegistrosAfectados integer;
      numeroUltimaSecuencia text;
      numeroUltimoPedido text;
  BEGIN
	IF TG_OP='INSERT' THEN
		EXECUTE $$SELECT num_secuencia
		FROM inventario.inv_pedidos_numeracion
		WHERE num_empresa = $1 AND
		      num_sector = $2 AND
		      num_motivo = $3$$
		INTO numeroUltimaSecuencia
		USING NEW.ped_empresa, NEW.ped_sector, NEW.ped_motivo;

		numeroUltimaSecuencia := COALESCE(numeroUltimaSecuencia,'0000000');

		IF numeroUltimaSecuencia < NEW.ped_numero THEN
			EXECUTE $$UPDATE inventario.inv_pedidos_numeracion
			     SET num_secuencia = $4
			     WHERE num_empresa = $1 AND
			           num_sector = $2 AND
				   num_motivo  = $3 $$
			USING NEW.ped_empresa, NEW.ped_sector, NEW.ped_motivo, NEW.ped_numero;

			GET DIAGNOSTICS nRegistrosAfectados = ROW_COUNT;

			IF nRegistrosAfectados=0 THEN
				EXECUTE $$INSERT INTO inventario.inv_pedidos_numeracion(num_empresa, num_sector, num_motivo, num_secuencia)
					VALUES ($1, $2, $3, $4)$$
				USING NEW.ped_empresa, NEW.ped_sector, NEW.ped_motivo, NEW.ped_numero;
			END IF;
		END IF;
		RETURN NEW;
	END IF;
    END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION actualizar_numero_ticket();