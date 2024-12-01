class ReservaDTO {
  constructor({ id_estancia, fecha_inicio, fecha_fin, estado_reserva, monto_pago, metodo_pago, estado_pago }) {
    this.id_estancia = parseInt(id_estancia, 10);
    this.fecha_inicio = new Date(fecha_inicio);
    this.fecha_fin = new Date(fecha_fin);
    this.estado_reserva = 'Pendiente';
    this.monto_pago = parseFloat(monto_pago);
    this.metodo_pago = metodo_pago;
    this.estado_pago = 'Pendiente';
  }

  static validate(reservaData) {
    const requiredFields = ['id_estancia', 'fecha_inicio', 'fecha_fin', 'monto_pago', 'metodo_pago'];

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
    if (isNaN(parseFloat(reservaData.monto_pago))) {
      throw new Error('El monto de pago debe ser un número válido.');
    }
    if (!['Efectivo', 'Tarjeta'].includes(reservaData.metodo_pago)) {
      throw new Error('El método de pago debe ser "Efectivo" o "Tarjeta".');
    }

    return true;
  }
}

module.exports = ReservaDTO;
