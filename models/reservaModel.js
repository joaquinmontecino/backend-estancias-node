// models/reservaModel.js
const { simpleExecute } = require('../config/database');

class ReservaModel {
  static async getAllReservas() {
    const query = 'SELECT * FROM Reserva';
    const result = await simpleExecute(query);
    return result;
  }

  static async getReservaById(id) {
    const query = 'SELECT * FROM Reserva WHERE id_reserva = $1';
    const result = await simpleExecute(query, [id]);
    return result[0];
  }

  static async createReserva(reservaData) {
    const { id_estancia, fecha_inicio, fecha_fin, estado_reserva, monto_pago, metodo_pago, estado_pago } = reservaData;
    const queryReserva = `
      INSERT INTO Reserva (id_estancia, fecha_inicio, fecha_fin, estado)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const bindsReserva = [id_estancia, fecha_inicio, fecha_fin, estado_reserva || 'Pendiente'];
    const resultReserva = await simpleExecute(queryReserva, bindsReserva);
    const id_reserva = resultReserva[0].id_reserva;
    const queryPago = `
      INSERT INTO Pago (id_reserva, monto_pago, metodo_pago, estado)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const bindsPago = [id_reserva, monto_pago, metodo_pago, estado_pago];
    const resultPago = await simpleExecute(queryPago, bindsPago);

    return {
      reserva: resultReserva[0],
      pago: resultPago[0]
    };
  }

  static async updateReserva(id, reservaData) {
    const { id_estancia, fecha_inicio, fecha_fin, estado } = reservaData;
    const query = `
      UPDATE Reserva
      SET id_estancia = $1, fecha_inicio = $2, fecha_fin = $3, estado = $4
      WHERE id_reserva = $5 RETURNING *
    `;
    const binds = [id_estancia, fecha_inicio, fecha_fin, estado, id];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async deleteReserva(id) {
    const query = 'DELETE FROM Reserva WHERE id_reserva = $1';
    await simpleExecute(query, [id]);
    return { message: 'Reserva eliminada correctamente' };
  }
}

module.exports = ReservaModel;
