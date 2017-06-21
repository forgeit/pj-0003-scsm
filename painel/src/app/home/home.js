(function () {

	'use strict';

	angular
		.module('painel.home')
		.controller('Home', Home);

	Home.$inject = ['mensagemDS', '$location'];

	function Home(mensagemDS, $location) {
		var vm = this;

		vm.irPara = irPara;

		buscarTotalContatoNaoLido();

		function buscarTotalContatoNaoLido() {
			vm.totalNaoLido = "Buscando...";
			mensagemDS.buscarTotalNaoLidaPorRevenda().then(success).catch(error);

			function error(response) {
				vm.totalNaoLido = "Erro";
			}

			function success(response) {
				if (response.data.exec) {
					vm.totalNaoLido = response.data.data.data;
				} else {
					vm.totalNaoLido = "Erro";
				}
			}
		}

		function irPara(ir) {
			$location.path(ir);
		}
	}

})();