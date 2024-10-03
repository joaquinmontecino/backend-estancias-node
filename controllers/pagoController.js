const PagoModel = require('../models/pagoModel');
const PagoDTO = require('../dto/pagoDTO');

class PagoController {

  static async getAll(req, res) {
    try {
      const pagos = await PagoModel.getAllPagos();
      res.status(200).json(pagos);
    } catch (err) {
      console.error('Error al obtener pagos:', err);
      res.status(500).json({ error: 'Error al obtener los pagos' });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const pago = await PagoModel.getPagoById(id);
      if (!pago) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }
      res.status(200).json(pago);
    } catch (err) {
      console.error('Error al obtener el pago:', err);
      res.status(500).json({ error: 'Error al obtener el pago' });
    }
  }

  static async create(req, res) {
    try {
      PagoDTO.validate(req.body);
      const pagoData = new PagoDTO(req.body);

      const nuevoPago = await PagoModel.createPago(pagoData);
      res.status(201).json(nuevoPago);
    } catch (err) {
      console.error('Error al crear el pago:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      PagoDTO.validate(req.body);
      const pagoData = new PagoDTO(req.body);

      const pagoActualizado = await PagoModel.updatePago(id, pagoData);
      if (!pagoActualizado) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }
      res.status(200).json(pagoActualizado);
    } catch (err) {
      console.error('Error al actualizar el pago:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await PagoModel.deletePago(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar el pago:', err);
      res.status(500).json({ error: 'Error al eliminar el pago' });
    }
  }
}

module.exports = PagoController;
