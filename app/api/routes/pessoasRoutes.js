const { Router } = require('express');
const PessoaController = require('../controllers/PessoasController');

const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoasAtivas);
router.get('/pessoas/todas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma);

router.get('/pessoas/:id/matriculas', PessoaController.pegaMatriculas);
router.post('/pessoas', PessoaController.adicionaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaDados);
router.delete('/pessoas/:id', PessoaController.deletaPessoa);
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaMatriculasDoAluno);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula);
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletaMatricula);
router.post('/pessoas/:id/restaura', PessoaController.restauraUmaPessoas);

module.exports = router;
