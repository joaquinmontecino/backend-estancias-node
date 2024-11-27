const { simpleExecute } = require('../config/database');

class ReporteModel {

  static async duracionMediaGeneral() {
    const query = `
      SELECT
        AVG(DATE_PART('day', Fecha_Fin - Fecha_Inicio)) AS Duracion_Media_General
      FROM Reserva
      WHERE Estado = 'Confirmada';
    `;
    const result = await simpleExecute(query);
    return result[0];
  }

  static async duracionMediaPeriodo(periodoData) {
    const {fecha_inicio, fecha_fin} = periodoData;

    const query = `
      SELECT
        AVG(DATE_PART('day', Fecha_Fin - Fecha_Inicio)) AS Duracion_Media_Periodo
      FROM Reserva
      WHERE Estado = 'Confirmada'
        AND Fecha_Inicio >= $1
        AND Fecha_Fin <= $2;
    `;
    const binds = [fecha_inicio, fecha_fin];

    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async tarifaDiariaPromedioGeneral (){
    const query = `
      SELECT
          AVG(Estancia.Precio_Noche) AS Tarifa_Diaria_Promedio_General
      FROM Reserva
      INNER JOIN Estancia ON Reserva.ID_Estancia = Estancia.ID_Estancia
      WHERE Reserva.Estado = 'Confirmada';
    `;
    const result = await simpleExecute(query);
    return result[0];
  }

  static async tarifaDiariaPromedioPeriodo (periodoData){
    const {fecha_inicio, fecha_fin} = periodoData;
    const query = `
      SELECT
          AVG(Estancia.Precio_Noche) AS Tarifa_Diaria_Promedio_Periodo
      FROM Reserva
      INNER JOIN Estancia ON Reserva.ID_Estancia = Estancia.ID_Estancia
      WHERE Reserva.Estado = 'Confirmada'
        AND Reserva.Fecha_Inicio >= $1
        AND Reserva.Fecha_Fin <= $2;
    `;
    const binds = [fecha_inicio, fecha_fin];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async incrementoIngresosPeriodos(periodosData){
    const {fecha_inicio_1, fecha_fin_1 , fecha_inicio_2, fecha_fin_2} = periodosData;
    const query = `
        SELECT
          COALESCE(Periodo1.Ingresos, 0) AS "Periodo 1",
          COALESCE(Periodo2.Ingresos, 0) AS "Periodo 2",
          (COALESCE(Periodo1.Ingresos, 0) - COALESCE(Periodo2.Ingresos, 0)) AS Diferencia
        FROM
          (SELECT SUM(Pago.Monto_Pago) AS Ingresos
          FROM Pago
          WHERE Pago.Estado = 'Confirmado'
            AND Pago.Fecha_Pago >= $1
            AND Pago.Fecha_Pago <= $2) AS Periodo1,
          (SELECT SUM(Pago.Monto_Pago) AS Ingresos
          FROM Pago
          WHERE Pago.Estado = 'Confirmado'
            AND Pago.Fecha_Pago >= $3
            AND Pago.Fecha_Pago <= $4) AS Periodo2;
    `;

    const binds = [fecha_inicio_1, fecha_fin_1 , fecha_inicio_2, fecha_fin_2];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

}

module.exports = ReporteModel;