(function () {
	'use strict';

	angular
		.module('painel.mensagem')
		.controller('Mensagem', Mensagem);

	Mensagem.$inject = ['mensagemDS', '$location', '$routeParams', 'tabela', '$scope'];

	function Mensagem(mensagemDS, $location, $routeParams, tabela, $scope) {
		var vm = this;

		vm.tabela = {};
		vm.instancia = {};

		montarTabela();

		function montarTabela() {
			criarOpcoesTabela();

			function carregarObjeto(aData) {
				$location.path('ver-mensagem/' + aData.id);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabela.adicionarColunas([
					{data: 'nome', title: 'Nome'},
					{data: 'email', title: 'E-mail', renderWith: function (data) {
						return data == null ? 'Não Informado' : data;
					}},
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
					mensagemDS.listar(data).then(success);

					function success(response) {
						callback(response.data.data);
					}
				}
			}

			function remover(aData) {
				mensagemDS.remover(aData.id).then(success).catch(error);

				function error(response) {
					console.log(response);
					toastr['error']('Ocorreu um erro ao remover.');
				}

				function success(response) {
					if (response.data.exec) {
						toastr['success']('Sucesso ao remover.');
						tabela.recarregarDados(vm.instancia);
					} else {
						toastr['error']('Ocorreu um erro ao remover.');						
					}
				}
			}
		}
	}
})();