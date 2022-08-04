const dataBase  =require("../models");

class NiveisController
{
	static async pegaTodosOsNiveis(req, res)
	{
		try {
			let todosNiveis = await dataBase.Niveis.findAll();
			res.status(200).json(todosNiveis);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async pegaUmNivel(req, res)
	{
		const {id} = req.params;
		try {
			let umNivel = await dataBase.Niveis.findOne({where:{id:Number(id)}});
			res.status(200).json(umNivel);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async adicionaUmNivel(req, res)
	{
		const dadosNovoNivel = req.body;
		try {
			let novoNivel = await dataBase.Niveis.create(dadosNovoNivel);
			res.status(200).json(novoNivel);
		} catch (error){
			res.status(500).json(error.message);
		}
	}

	static async atualizaUmNivel(req, res)
	{
		const {id} = req.params;
		const novosDados = req.body;
		try {
			await dataBase.Niveis.update(novosDados, {where:{id:Number(id)}});
			let nivelAtualizado = await dataBase.Niveis.findOne({where:{id:Number(id)}});
			res.status(200).json(nivelAtualizado);
		} catch (error){
			res.status(500).json(error.message);

		}
	}

	static async deletaNivel(req, res)
	{
		const {id} = req.params;
		try {
			await dataBase.Niveis.destroy({where:{id:Number(id)}});
			res.status(200).json({message:"Pronto"});
		} catch (error) {
			res.status(500).json(error.message);

		}
	}
}

module.exports = NiveisController;
