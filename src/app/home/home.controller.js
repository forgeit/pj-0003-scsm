(function () {

	'use strict';

	angular
		.module('app.home')
		.controller('Home', Home);

	Home.$inject = ['secoesDataService'];

	function Home(secoesDataService) {
		var vm = this;

		vm.secoes = [];

		iniciar();

		function carregarSecoes() {
			return secoesDataService.buscarTodos().then(success).catch(error);

			function error() {}

			function success(response) {
				vm.secoes = response.data;
			}
		}

		function iniciar() {
			carregarSecoes();
		}
	}

})();