const Services = require('../services/TurmasServices');
const service = new Services();


class TurmasController
{
	static async pegaTodasAsTurmas(req, res)
	{
		const {data_inicial, data_final} = req.query;

		try{
			const turmas = await service.pegaTurmas(data_inicial, data_final);
			res.status(200).json(turmas);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async adicionaTurma(req, res)
	{
		const dados = req.body;
		try {
			// let novoTurma = await dataBase.Turmas.create(dados);
			let novaTurma = await service.adicionaNovoRegistro(dados);
			res.status(200).json(novaTurma);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async pegaUmaTurma(req, res)
	{
		const {id} = req.params;
		try{
			let umaTurma = await service.pegaUmRegistro(id);
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
			let turmaAtualizada = await service.atualizaDadosTurma(id, novosDados);
			res.status(200).json(turmaAtualizada);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async apagaTurma(req, res)
	{
		const {id} = req.params;
		try {
			await service.deletaRegistro(id);
			res.status(200).json({message:"Pronto"});
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}

module.exports = TurmasController;
