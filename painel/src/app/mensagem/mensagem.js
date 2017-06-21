(function () {
	'use strict';

	angular
		.module('painel.mensagem')
		.controller('Mensagem', Mensagem);

	Mensagem.$inject = ['mensagemDS', '$location', '$routeParams'];

	function Mensagem(mensagemDS, $location, $routeParams) {
		var vm = this;

		vm.mensagemList = [];

		buscarMensagens();

		function buscarMensagens() {
			vm.mensagemList = [];
			mensagemDS.listar().then(success).catch(error);

			function error(response) {
				toastr['error']('Erro ao carregar as mensagens.');
			}

			function success(response) {
				if (response.data.exec) {
					vm.mensagemList = response.data.data;
				} else {
					toastr['error']('Erro ao carregar as mensagens.');		
				}
			}
		}

	}
})();