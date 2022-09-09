const database = require('../models');

class Services
{
	constructor(nomeDoBanco)
	{
		this.nomeDoBanco = nomeDoBanco;
	}
	 // get
	async pegaTodosOsRegistros(where = {})
	{
		return database[this.nomeDoBanco].findAll({where:{...where}});
	}

	async pegaUmRegistro(id)
	{
		return database[this.nomeDoBanco].findOne({where:{id:Number(id)}});
	}
	// post
	async atualizaDado(dados, id, transaction)
	{
		return database[this.nomeDoBanco].update(dados, {where:{id:Number(id)}, transaction:transaction});
	}

	async atualizaDados(dados, where, transaction)
	{
		return database[this.nomeDoBanco].update(dados, {where:{...where}, transaction:transaction});
	}

	// put

	async adicionaNovoRegistro(dados)
	{
		return database[this.nomeDoBanco].create(dados);
	}

	//delete
	async deletaRegistro(id)
	{
		return database[this.nomeDoBanco].destroy({where:{id:Number(id)}});
	}
}

module.exports = Services;
