const express = require('express');
const ReservaController = require('../controllers/reservaController');
const router = express.Router();

router.get('/', ReservaController.getAll);
router.get('/:id', ReservaController.getById);
router.post('/', ReservaController.create);
router.put('/:id', ReservaController.update);
router.delete('/:id', ReservaController.delete);
router.put('/confirmar/:id', ReservaController.confirmar);
router.put('/cancelar/:id', ReservaController.cancelar);

module.exports = router;