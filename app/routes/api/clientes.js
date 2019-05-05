var express = require('express');
var router = express.Router();
const clienteController = require('../../controllers/clienteController');

router.get('/clientes', clienteController.getAllUsers);
router.get('/clientes/:id', clienteController.getUserById);
router.post('/clientes', clienteController.createUser);
router.put('/clientes/:id', clienteController.updateUser);
router.delete('/clientes/:id', clienteController.deleteUser);

module.exports = router;