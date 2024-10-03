const { simpleExecute } = require('../config/database');

class PagoModel {

  static async getAllPagos() {
    const query = 'SELECT * FROM Pago';
    const result = await simpleExecute(query);
    return result;
  }

  static async getPagoById(id) {
    const query = 'SELECT * FROM Pago WHERE id_pago = $1';
    const result = await simpleExecute(query, [id]);
    return result[0];
  }

  static async createPago(pagoData) {
    const { id_reserva, monto_pago, metodo_pago, estado } = pagoData;
    const query = `
      INSERT INTO Pago (id_reserva, monto_pago, metodo_pago, estado) 
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const binds = [id_reserva, monto_pago, metodo_pago, estado];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async updatePago(id, pagoData) {
    const { id_reserva, monto_pago, metodo_pago, estado } = pagoData;
    const query = `
      UPDATE Pago 
      SET id_reserva = $1, monto_pago = $2, metodo_pago = $3, estado = $4
      WHERE id_pago = $5 RETURNING *
    `;
    const binds = [id_reserva, monto_pago, metodo_pago, estado, id];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async deletePago(id) {
    const query = 'DELETE FROM Pago WHERE id_pago = $1';
    await simpleExecute(query, [id]);
    return { message: 'Pago eliminado correctamente' };
  }
}

module.exports = PagoModel;
