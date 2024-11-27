const ReporteModel = require('../models/reporteModel');

class ReporteController{

  static async duracionMediaGeneral(req, res){
    try{
      const reporte = await ReporteModel.duracionMediaGeneral();
      res.status(200).json(reporte);
    } catch (err) {
      console.error('Error al obtener reporte: ', err);
      res.status(500).json({ error: 'Error al obtener reporte' });
    }
  }

  static async duracionMediaPeriodo(req, res){
    try{
      const reporte = await ReporteModel.duracionMediaPeriodo(req.body);
      if (!reporte) {
        return res.status(404).json({ error: 'Error al obtener reporte' });
      }
      res.status(200).json(reporte);
    } catch (err) {
      console.error('Error al obtener reporte: ', err);
      res.status(500).json({ error: 'Error al obtener reporte' });
    }
  }

  static async tarifaDiariaPromedioGeneral(req, res){
    try{
      const reporte = await ReporteModel.tarifaDiariaPromedioGeneral();
      res.status(200).json(reporte);
    } catch (err) {
      console.error('Error al obtener reporte: ', err);
      res.status(500).json({ error: 'Error al obtener reporte' });
    }
  }

  static async tarifaDiariaPromedioPeriodo(req, res){
    try{
      const reporte = await ReporteModel.tarifaDiariaPromedioPeriodo(req.body);
      if (!reporte) {
        return res.status(404).json({ error: 'Error al obtener reporte' });
      }
      res.status(200).json(reporte);
    } catch (err) {
      console.error('Error al obtener reporte: ', err);
      res.status(500).json({ error: 'Error al obtener reporte' });
    }
  }

  static async incrementoIngresosPeriodos(req, res){
    try{
      const reporte = await ReporteModel.incrementoIngresosPeriodos(req.body);
      if (!reporte) {
        return res.status(404).json({ error: 'Error al obtener reporte' });
      }
      res.status(200).json(reporte);
    } catch (err) {
      console.error('Error al obtener reporte: ', err);
      res.status(500).json({ error: 'Error al obtener reporte' });
    }
  }

}

module.exports = ReporteController;