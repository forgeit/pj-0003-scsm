(function () {
	'use strict';

	angular
		.module('painel.mensagem')
		.controller('Mensagem', Mensagem);

	Mensagem.$inject = ['mensagemDS', '$location', '$routeParams', 'tabela'];

	function Mensagem(mensagemDS, $location, $routeParams, tabela) {
		var vm = this;

		vm.tabela = {};
		vm.instancia = {};

		montarTabela();

		function montarTabela() {
			criarOpcoesTabela();

			function carregarObjeto(aData) {
				controller.$location.path(vm.linkParaFormulario + aData.id);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabela.adicionarColunas([
					{data: 'nome', title: 'Nome'},
					{data: 'email', title: 'E-mail'},
					{data: 'moto', name: 'nome_moto', title: 'Moto', renderWith: function (data, display, full) {
						return '<a target="_" href="registrar-moto/' + full.id_moto + '">' + full.nome_moto + '/' + full.ano_moto + '</a>';
					}},
					{data: 'data_hora_recebido', title: 'Hora de Recebimento'},
					{data: 'visualizado', title: 'Visualizado'},
					{data: 'id', title: 'Ações', renderWith: tabela.criarBotaoPadrao}
				]);
			}

			function criarOpcoesTabela() {
				vm.tabela.opcoes = tabela.criarTabela(ajax, vm, remover, 'data', carregarObjeto);
				criarColunasTabela();

				function ajax(data, callback, settings) {
					mensagemDS.listar(data).then(success).catch(error);

					function error(response) {
						console.log(response);
					}

					function success(response) {
						callback(response.data.data);
					}
				}
			}

			function remover(aData) {
				dataservice.remover(aData.id).then(success).catch(error);

				function error(response) {
					controller.feed(msg.MG013);				}

				function success(response) {
					controller.feedMessage(response);
					if (response.data.status == 'true') {
						tabela.recarregarDados(vm.instancia);
					}
				}
			}
		}
	}
})();