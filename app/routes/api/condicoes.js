const express = require('express');
const router = express.Router();
var models = require('../../models');

/* GET All Condicoes Pagamento */
router.get('/condicoes', (req, res) => {
    models.CondicaoPagamento.findAll().then(condicoes => res.json(condicoes))
})

router.delete('/condicoes/:id', (req, res) => {
    const id = req.params.id;

    models.CondicaoPagamento.destroy({
        where: { username: id }
    })
        .then(condicao => {
            res.json(condicao);
        });
})

module.exports = router;