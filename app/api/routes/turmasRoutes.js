const {Router} = require('express');
const turmaController = require('../controllers/TurmasController');
const router = Router();

router.get('/turmas', turmaController.pegaTodasAsTurmas);
router.get('/turmas/:id', turmaController.pegaUmaTurma);
router.put('/turmas/:id', turmaController.atualizaTurma);
router.post('/turmas', turmaController.adicionaTurma);
router.delete('/turmas/:id', turmaController.apagaTurma);



module.exports = router;
