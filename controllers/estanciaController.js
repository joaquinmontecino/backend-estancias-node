const EstanciaModel = require('../models/estanciaModel');
const EstanciaDTO = require('../dto/estanciaDTO');

class EstanciaController {

  static async getAll(req, res) {
    try {
      const estancias = await EstanciaModel.getAllEstancias();
      res.status(200).json(estancias);
    } catch (err) {
      console.error('Error al obtener estancias:', err);
      res.status(500).json({ error: 'Error al obtener las estancias' });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const estancia = await EstanciaModel.getEstanciaById(id);
      if (!estancia) {
        return res.status(404).json({ error: 'Estancia no encontrada' });
      }
      res.status(200).json(estancia);
    } catch (err) {
      console.error('Error al obtener la estancia:', err);
      res.status(500).json({ error: 'Error al obtener la estancia' });
    }
  }

  static async create(req, res) {
    try {
      EstanciaDTO.validate(req.body);
      const estanciaData = new EstanciaDTO(req.body);

      const nuevaEstancia = await EstanciaModel.createEstancia(estanciaData);
      res.status(201).json(nuevaEstancia);
    } catch (err) {
      console.error('Error al crear la estancia:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    try {
      // Obtiene la estancia actual desde la base de datos
      const estanciaActual = await EstanciaModel.getEstanciaById(id);
      if (!estanciaActual) {
        return res.status(404).json({ error: 'Estancia no encontrada' });
      }

      // Combina los datos actuales con los nuevos proporcionados en el cuerpo de la solicitud
      const estanciaData = {
        ...estanciaActual,  // mantiene los valores actuales
        ...req.body         // sobrescribe con los nuevos valores proporcionados
      };

      // Valida solo los campos que están presentes en la solicitud
      EstanciaDTO.validatePartial(estanciaData);

      // Actualiza la estancia con los datos combinados
      const estanciaActualizada = await EstanciaModel.updateEstancia(id, estanciaData);
      res.status(200).json(estanciaActualizada);
    } catch (err) {
      console.error('Error al actualizar la estancia:', err.message);
      res.status(400).json({ error: err.message });
    }
  }


  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await EstanciaModel.deleteEstancia(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar la estancia:', err);
      res.status(500).json({ error: 'Error al eliminar la estancia' });
    }
  }
}

module.exports = EstanciaController;
