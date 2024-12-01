const ReservaDTO = require('../dto/reservaDTO');
const ReservaModel = require('../models/reservaModel');

class ReservaController {
  static async getAll(req, res) {
    try {
      const reservas = await ReservaModel.getAllReservas();
      res.status(200).json(reservas);
    } catch (err) {
      console.error('Error al obtener reservas:', err);
      res.status(500).json({ error: 'Error al obtener las reservas' });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const reserva = await ReservaModel.getReservaById(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      res.status(200).json(reserva);
    } catch (err) {
      console.error('Error al obtener la reserva:', err);
      res.status(500).json({ error: 'Error al obtener la reserva' });
    }
  }

  static async create(req, res) {
    try {
      ReservaDTO.validate(req.body);
      const reservaData = new ReservaDTO(req.body);

      const nuevaReserva = await ReservaModel.createReserva(reservaData);
      res.status(201).json(nuevaReserva);
    } catch (err) {
      console.error('Error al crear la reserva:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      const reservaActual = await ReservaModel.getReservaById(id);
      if (!reservaActual){
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      const reservaData = {
        ...reservaActual,
        ...req.body
      };

      ReservaDTO.validate(reservaData);

      const reservaActualizada = await ReservaModel.updateReserva(id, reservaData);
      res.status(200).json(reservaActualizada);
    } catch (err) {
      console.error('Error al actualizar la reserva:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await ReservaModel.deleteReserva(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar la reserva:', err);
      res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
  }

  static async confirmar(req, res){
    const { id } = req.params;
    try {
      const reservaActual = await ReservaModel.getReservaById(id);
      if (!reservaActual){
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const reservaActualizada = await ReservaModel.confirmarReserva(id);
      res.status(200).json(reservaActualizada);
    } catch (err) {
      console.error('Error al actualizar la reserva:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async cancelar(req, res){
    const { id } = req.params;
    try {
      const reservaActual = await ReservaModel.getReservaById(id);
      if (!reservaActual){
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const reservaActualizada = await ReservaModel.cancelarReserva(id);
      res.status(200).json(reservaActualizada);
    } catch (err) {
      console.error('Error al actualizar la reserva:', err.message);
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ReservaController;
