const { Router } = require('express');
const PessoaController = require('../controllers/PessoasController');

const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoasAtivas);
router.get('/pessoas/todas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaMatriculasDoAluno);
router.get('/pessoas/turmas/lotadas', PessoaController.pegaTurmasLotadas);
router.get('/pessoas/:id/matriculas', PessoaController.pegaMatriculas);
router.post('/pessoas', PessoaController.adicionaPessoa);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula);
router.post('/pessoas/:id/restaura', PessoaController.restauraUmaPessoas);
router.post('/pessoas/:estudanteId/matriculas', PessoaController.cancelaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaDados);
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:id', PessoaController.deletaPessoa);
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletaMatricula);

module.exports = router;
