class ReservaDTO {
  constructor({ id_estancia, fecha_inicio, fecha_fin, estado }) {
    this.id_estancia = parseInt(id_estancia, 10);
    this.fecha_inicio = new Date(fecha_inicio);
    this.fecha_fin = new Date(fecha_fin);
    this.estado = estado || 'Pendiente';
  }

  static validate(reservaData) {
    const requiredFields = ['id_estancia', 'fecha_inicio', 'fecha_fin'];

    for (let field of requiredFields) {
      if (!reservaData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    if (isNaN(parseInt(reservaData.id_estancia, 10))) {
      throw new Error('ID de estancia debe ser un número válido.');
    }
    if (new Date(reservaData.fecha_fin) <= new Date(reservaData.fecha_inicio)) {
      throw new Error('La fecha de fin debe ser mayor a la fecha de inicio.');
    }

    return true;
  }
}

module.exports = ReservaDTO;
