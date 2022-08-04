const database = require("../models");

class PessoaController
{
	static async pegaTodasAsPessoas(req, res)
	{
		try{
			let todasPessoas = await database.Pessoas.findAll();
			return res.status(200).json(todasPessoas);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async pegaUmaPessoa(req, res)
	{
		const {id} = req.params;
		try{
			let umaPessoa = await database.Pessoas.findOne(
				{
					where: {
						id: Number(id)
					}
				}
			);
			res.status(200).json(umaPessoa);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async adicionaPessoa(req, res)
	{
		const umaNovaPessoa = req.body;
		try{
			let pessoa = await database.Pessoas.create(umaNovaPessoa);
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
			await database.Pessoas.update(novosDados, {where:{id: Number(id)}});
			let dadosAtualizados = await database.Pessoas.findOne({where:{id: Number(id)}});
			res.status(200).json(dadosAtualizados);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async deletaPessoa(req, res)
	{
		const {id} = req.params;
		try{
			await database.Pessoas.destroy({where:{id:Number(id)}});
			res.status(200).json({message:"Pronto."});
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async pegaMatriculasDoAluno(req, res)
	{

		const {estudanteId, matriculaId} = req.params;
		try {
			let matricula = await database.Matriculas.findOne({
				where:{
					id: Number(matriculaId),
					estudante_id:Number(estudanteId)
				}
			});
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
			const matricula = await database.Matriculas.create(novaMatricula);
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
}

module.exports = PessoaController;
