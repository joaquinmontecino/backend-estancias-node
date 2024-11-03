const { simpleExecute } = require('../config/database');

class EstanciaModel {

  static async getAllEstancias() {
    const query = 'SELECT * FROM Estancia';
    const result = await simpleExecute(query);
    return result;
  }

  static async getEstanciaById(id) {
    const query = 'SELECT * FROM Estancia WHERE id_estancia = $1';
    const result = await simpleExecute(query, [id]);
    return result[0];
  }

  static async createEstancia(estanciaData) {
    const { nombre, tipo, precio_noche, camas_individuales, camas_dobles, disponibilidad, cocina, calefont } = estanciaData;
    const query = `
      INSERT INTO Estancia (nombre, tipo, precio_noche, camas_individuales, camas_dobles, disponibilidad, cocina, calefont) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const binds = [nombre, tipo, precio_noche, camas_individuales, camas_dobles, disponibilidad, cocina, calefont];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async updateEstancia(id, estanciaData) {
    const { nombre, tipo, precio_noche, camas_individuales, camas_dobles, disponibilidad, cocina, calefont } = estanciaData;
    const query = `
      UPDATE Estancia
      SET nombre = $1, tipo = $2, precio_noche = $3, camas_individuales = $4, camas_dobles = $5,
          disponibilidad = $6, cocina = $7, calefont = $8
      WHERE id_estancia = $9 RETURNING *
    `;
    const binds = [nombre, tipo, precio_noche, camas_individuales, camas_dobles, disponibilidad, cocina, calefont, id];
    const result = await simpleExecute(query, binds);
    return result[0];
  }


  static async deleteEstancia(id) {
    const query = 'DELETE FROM Estancia WHERE id_estancia = $1';
    await simpleExecute(query, [id]);
    return { message: 'Estancia eliminada correctamente' };
  }
}

module.exports = EstanciaModel;
