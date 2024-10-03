const express = require('express');
const PagoController = require('../controllers/pagoController');
const router = express.Router();

router.get('/', PagoController.getAll);
router.get('/:id', PagoController.getById);
router.post('/', PagoController.create);
router.put('/:id', PagoController.update);
router.delete('/:id', PagoController.delete);

module.exports = router;