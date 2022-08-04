const dataBase = require('../models');

class TurmasController
{
	static async pegaTodasAsTurmas(req, res)
	{
		try{
			const turmas = await dataBase.Turmas.findAll();
			res.status(200).json(turmas);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async adicionaTurma(req, res)
	{
		const dados = req.body;
		try {
			let novoTurma = await dataBase.Turmas.create(dados);
			res.status(200).json(novoTurma);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async pegaUmaTurma(req, res)
	{
		const {id} = req.params;
		try{
			const umaTurma = await dataBase.Turmas.findOne({where:{id:Number(id)}});
			return res.status(200).json(umaTurma);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async atualizaTurma(req, res)
	{
		const {id} = req.params;
		const novosDados = req.body;
		try{
			await dataBase.Turmas.update(novosDados, {where:{id:Number(id)}});
			let turmaAtualizada = await dataBase.Turmas.findOne({where:{id:Number(id)}});
			res.status(200).json(turmaAtualizada);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async apagaTurma(req, res)
	{
		const {id} = req.params;
		try {
			await dataBase.Turmas.destroy({where:{id:Number(id)}});
			res.status(200).json({message:"Pronto"});
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}

module.exports = TurmasController;
