const express = require('express');
const ReporteController = require('../controllers/reporteController');
const router = express.Router();

router.get('/duracion-avg',ReporteController.duracionMediaGeneral);
router.post('/duracion-periodo',ReporteController.duracionMediaPeriodo);
router.get('/tarifa-avg',ReporteController.tarifaDiariaPromedioGeneral);
router.post('/tarifa-periodo',ReporteController.tarifaDiariaPromedioPeriodo);
router.post('/incremento-ingresos',ReporteController.incrementoIngresosPeriodos);

module.exports = router;