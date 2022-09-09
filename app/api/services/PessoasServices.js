const Services = require('./Services');
const Sequelize = require('sequelize');
const database = require('../models');

class PessoasServices extends Services
{
	constructor()
	{
		super("Pessoas");
		this.matriculas = new Services("Matriculas");
	}

	async pegaTodasAtivas(where = {})
	{
		return database[this.nomeDoBanco].findAll({where:{...where}})
	}

	async pegaTodasAsPessoas(where = {})
	{
		return database[this.nomeDoBanco].scope("todos").findAll({where:{...where}})
	}

	async cancelaPessoaEMatriculas(estudanteId)
	{
		return database.sequelize.transaction(async transacao =>{
			await super.atualizaDado({ativo: false}, estudanteId, transacao);
			await this.matriculas.atualizaDados({status:"cancelado"}, {estudante_id:estudanteId},transacao);
		})
	}

	async atualizaDadosPessoa(id, dados)
	{
		return database.sequelize.transaction(async transacao =>{
			await super.atualizaDado(dados, id, transacao);
			let pessoaAtualizada = super.pegaUmRegistro(id);
			return pessoaAtualizada;
		})
	}

	async restauraPessoa(id)
	{
		return database[this.nomeDoBanco].restore({where:{id:Number(id)}});
	}

	async pegaMatricula(estudanteId, matriculaId)
	{
		return database[this.matriculas.nomeDoBanco].findOne({where:{id:Number(matriculaId), estudante_id:Number(estudanteId)}});
	}

	async criaMatricula(dados)
	{
		return this.matriculas.adicionaNovoRegistro(dados);
	}

	async pegaTodasMatriculas(id)
	{
		return database.sequelize.transaction(async transacao =>{
			const pessoa = await super.pegaUmRegistro(id);
			const matriculas = await pessoa.getAulasMatriculadas();
			return matriculas;
		})
	}

	async pegaMatriculasTurma(turmaId)
	{
		return database[this.matriculas.nomeDoBanco].findAndCountAll({where:{turma_id:Number(turmaId), status:"confirmado"}});
	}

	async turmasLotadas(lotacao)
	{
		return database[this.matriculas.nomeDoBanco].findAndCountAll({
			where:{status:"confirmado"},
			attributes:["turma_id"],
			group: ["turma_id"],
			having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)
			}
		)
	}
}

module.exports = PessoasServices;
