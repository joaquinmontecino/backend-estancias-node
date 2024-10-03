class PagoDTO {
  constructor({ id_reserva, monto_pago, metodo_pago, estado }) {
    this.id_reserva = parseInt(id_reserva, 10);
    this.monto_pago = parseFloat(monto_pago);
    this.metodo_pago = metodo_pago;
    this.estado = estado || 'Pendiente';
  }

  static validate(pagoData) {
    const requiredFields = ['id_reserva', 'monto_pago', 'metodo_pago'];

    for (let field of requiredFields) {
      if (!pagoData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    if (isNaN(parseInt(pagoData.id_reserva, 10))) {
      throw new Error('ID de reserva debe ser un número válido.');
    }
    if (isNaN(parseFloat(pagoData.monto_pago))) {
      throw new Error('El monto de pago debe ser un número válido.');
    }
    if (!['Efectivo', 'Tarjeta'].includes(pagoData.metodo_pago)) {
      throw new Error('El método de pago debe ser "Efectivo" o "Tarjeta".');
    }
    if (pagoData.estado && !['Pendiente', 'Confirmado', 'Cancelado'].includes(pagoData.estado)) {
      throw new Error('El estado debe ser "Pendiente", "Confirmado" o "Cancelado".');
    }

    return true;
  }
}

module.exports = PagoDTO;
