const Services = require('./Services');
const database = require('../models');
const sequelize = require('sequelize');
const op = sequelize.Op;

class TurmasServices extends Services
{
	constructor()
	{
		super("Turmas");
	}

	async atualizaDadosTurma(id, dados)
	{
		return database.sequelize.transaction(async transacao =>{
			await super.atualizaDado(dados, id, transacao);
			let turmaAtualizada  = await super.pegaUmRegistro(id);
			console.log(turmaAtualizada)
			return turmaAtualizada;
		})
	}

	async pegaTurmas(data_inicial, data_final)
	{
		const where = {};
		data_inicial || data_final ? where.data_inicio = {}: null;
		data_inicial ? where.data_inicio[op.gte] = data_inicial : null;
		data_final ? where.data_inicio[op.lte] = data_final : null;
		return super.pegaTodosOsRegistros(where);
	}
}

module.exports = TurmasServices;
