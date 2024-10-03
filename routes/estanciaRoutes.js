const express = require('express');
const EstanciaController = require('../controllers/estanciaController');
const router = express.Router();

router.get('/', EstanciaController.getAll);
router.get('/:id', EstanciaController.getById);
router.post('/', EstanciaController.create);
router.put('/:id', EstanciaController.update);
router.delete('/:id', EstanciaController.delete);

module.exports = router;