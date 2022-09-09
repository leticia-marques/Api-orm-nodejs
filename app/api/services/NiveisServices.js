const Services = require('./Services');
const database = require('../models');

class NiveisServices extends Services
{
	constructor()
	{
		super("Niveis");
	}

	async atualizaNivel(id, dados)
	{
		return database.sequelize.transaction(async transacao =>{
			await super.atualizaDado(dados, id, transacao);
			let retorno = await super.pegaUmRegistro(id);
			return retorno;
		})
	}
}

module.exports = NiveisServices;
