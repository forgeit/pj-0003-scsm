(function () {

	'use strict';

	angular
		.module('painel.home')
		.controller('Home', Home);

	Home.$inject = ['mensagemDS', '$location', 'motoDS'];

	function Home(mensagemDS, $location, motoDS) {
		var vm = this;

		vm.irPara = irPara;

		buscarTotalContatoNaoLido();
		buscarTotalizadores();

		function buscarTotalContatoNaoLido() {
			vm.totalNaoLido = "Buscando...";
			mensagemDS.buscarTotalNaoLidaPorRevenda().then(success).catch(error);

			function error(response) {
				vm.totalNaoLido = "Erro";
			}

			function success(response) {
				if (response.data.exec) {
					vm.totalNaoLido = response.data.data.total;
				} else {
					vm.totalNaoLido = "Erro";
				}
			}
		}

		function buscarTotalizadores() {
			motoDS.buscarTotalizadores().then(success);

			function success(response) {
				if (response.data.exec) {
					vm.totalizadores = response.data.data;
					console.log(vm.totalizadores);
				}
			}
		}


		function irPara(ir) {
			$location.path(ir);
		}
	}

})();