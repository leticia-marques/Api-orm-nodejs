// const database = require("../models");
// const Sequelize = require("sequelize");
const Services = require('../services');
const service = new Services.PessoasServices();

class PessoaController
{
	static async pegaTodasAsPessoas(req, res)
	{
		try{
			let todasPessoas = await service.pegaTodasAsPessoas();
			return res.status(200).json(todasPessoas);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async pegaTodasAsPessoasAtivas(req, res)
	{
		try{
			let pessoasAtivas = await service.pegaTodasAtivas();
			return res.status(200).json(pessoasAtivas);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async pegaUmaPessoa(req, res)
	{
		const {id} = req.params;
		try{
			let umaPessoa = await service.pegaUmRegistro(id);
			res.status(200).json(umaPessoa);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async adicionaPessoa(req, res)
	{
		const umaNovaPessoa = req.body;
		try{
			// let pessoa = await database.Pessoas.create(umaNovaPessoa);
			let pessoa = await service.adicionaNovoRegistro(umaNovaPessoa);
			return res.status(200).json(pessoa);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async atualizaDados(req, res)
	{
		const {id} = req.params;
		const novosDados = req.body;
		try{
			let dadosAtualizados = await service.atualizaDadosPessoa(id, novosDados);
			res.status(200).json(dadosAtualizados);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async restauraUmaPessoas(req, res)
	{
		const {id} = req.params;
		try {
			const pessoaRestaurada = await service.restauraPessoa(id);
			res.status(200).json({message: `o ${id} foi restaurado`});
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	static async deletaPessoa(req, res)
	{
		const {id} = req.params;
		try{
			await service.deletaRegistro(id);
			res.status(200).json({message:"Pronto."});
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async pegaMatriculasDoAluno(req, res)
	{

		const {estudanteId, matriculaId} = req.params;
		try {
			let matricula = await service.pegaMatricula(estudanteId, matriculaId);
			res.status(200).json(matricula);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async criaMatricula(req, res)
	{
		const {estudanteId} = req.params;
		const novaMatricula = {...req.body, estudante_id:estudanteId};
		try {
			const matricula = await service.criaMatricula(novaMatricula);
			res.status(200).json(matricula);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async atualizaMatricula(req, res)
	{
		const {estudanteId, matriculaId} = req.params;
		const novosDados = req.body;
		try {
			await database.Matriculas.update(novosDados, {
				where:{
					id:Number(matriculaId),
					estudante_id:Number(estudanteId)
				}});
			const matriculaAtualizada = await database.Matriculas.findOne({
				where:{
					id:Number(matriculaId),
					estudante_id:Number(estudanteId)
				}
			})
			res.status(200).json(matriculaAtualizada)
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async deletaMatricula(req, res)
	{
		const {estudanteId, matriculaId} = req.params;
		try {
			await database.Matriculas.destroy({
				where:{
					id:Number(matriculaId),
					estudante_id:Number(estudanteId)
				}
			})
			res.status(200).json({message:"Pronto"})
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async pegaMatriculas(req, res)
	{
		const {id} = req.params;
		try {
			// const pessoa = await database.Pessoas.findOne({where:{id:Number(id)}});
			const matriculas = await service.pegaTodasMatriculas(id);
			res.status(200).json(matriculas);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async pegaMatriculasPorTurma(req, res)
	{
		const {turmaId} = req.params;
		try {
			const matriculas = await service.pegaMatriculasTurma(turmaId);
			res.status(200).json(matriculas)
		} catch (error) {
			res.status(500).json(error.message);

		}
	}

	static async pegaTurmasLotadas(req, res)
	{
		const lotacao = 2;
		try {
			const matriculas = await service.turmasLotadas(lotacao);
			res.status(200).json(matriculas);
		} catch (error) {
			res.status(500).json(error.message);

		}
	}

	static async cancelaPessoa(req, res)
	{
		const {estudanteId} = req.params;
		try {
			await service.cancelaPessoaEMatriculas(Number(estudanteId));
			res.status(200).json({message:"Estudante cancelado"});
		} catch (error) {
			res.status(500).json(error.message);

		}
	}
}

module.exports = PessoaController;
