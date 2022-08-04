const {Router} = require('express');
const niveisController = require('../controllers/NiveisController');

const router = Router();

router.get('/niveis', niveisController.pegaTodosOsNiveis);
router.get('/niveis/:id', niveisController.pegaUmNivel);
router.post('/niveis', niveisController.adicionaUmNivel);
router.put('/niveis/:id', niveisController.atualizaUmNivel);
router.delete('/niveis/:id', niveisController.deletaNivel);


module.exports = router;
