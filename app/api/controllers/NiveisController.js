// const dataBase  =require("../models");

const {NiveisServices} = require('../services');
const services = new NiveisServices();

class NiveisController
{
	static async pegaTodosOsNiveis(req, res)
	{
		try {
			let todosNiveis = await services.pegaTodosOsRegistros();
			res.status(200).json(todosNiveis);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async pegaUmNivel(req, res)
	{
		const {id} = req.params;
		try {
			let umNivel = await services.pegaUmRegistro(id);
			res.status(200).json(umNivel);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	static async adicionaUmNivel(req, res)
	{
		const dadosNovoNivel = req.body;
		try {
			// let novoNivel = await dataBase.Niveis.create(dadosNovoNivel);
			let novoNivel = await services.adicionaNovoRegistro(dadosNovoNivel);
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
			let nivelAtualizado = await services.atualizaNivel(id, novosDados);
			res.status(200).json(nivelAtualizado);
		} catch (error){
			res.status(500).json(error.message);

		}
	}

	static async deletaNivel(req, res)
	{
		const {id} = req.params;
		try {
			await services.deletaRegistro(id);
			res.status(200).json({message:"Pronto"});
		} catch (error) {
			res.status(500).json(error.message);

		}
	}
}

module.exports = NiveisController;
