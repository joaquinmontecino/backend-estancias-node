class EstanciaDTO {
  constructor({ nombre, tipo, precio_noche, camas_individuales, camas_dobles, disponibilidad, cocina, calefont }) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio_noche = parseInt(precio_noche, 10);
    this.camas_individuales = parseInt(camas_individuales, 10);
    this.camas_dobles = parseInt(camas_dobles, 10);
    this.disponibilidad = disponibilidad === true || disponibilidad === 'true';
    this.cocina = cocina === true || cocina === 'true';
    this.calefont = calefont === true || calefont === 'true';
  }

  static validate(estanciaData) {
    const requiredFields = ['nombre', 'tipo', 'precio_noche', 'camas_individuales', 'camas_dobles', 'disponibilidad', 'cocina', 'calefont'];

    for (let field of requiredFields) {
      if (!estanciaData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    if (isNaN(parseInt(estanciaData.precio_noche, 10))) {
      throw new Error('El precio por noche debe ser un número válido.');
    }
    if (isNaN(parseInt(estanciaData.camas_individuales, 10)) || isNaN(parseInt(estanciaData.camas_dobles, 10))) {
      throw new Error('Las camas deben ser números válidos.');
    }

    return true;
  }

  static validatePartial(estanciaData) {
    if (estanciaData.precio_noche && isNaN(parseInt(estanciaData.precio_noche, 10))) {
      throw new Error('El precio por noche debe ser un número válido.');
    }
    if (estanciaData.camas_individuales && isNaN(parseInt(estanciaData.camas_individuales, 10))) {
      throw new Error('Las camas individuales deben ser un número válido.');
    }
    if (estanciaData.camas_dobles && isNaN(parseInt(estanciaData.camas_dobles, 10))) {
      throw new Error('Las camas dobles deben ser un número válido.');
    }
    return true;
  }
}

module.exports = EstanciaDTO;
