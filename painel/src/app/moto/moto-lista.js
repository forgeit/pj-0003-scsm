(function () {
	'use strict';

	angular
		.module('painel.moto')
		.controller('MotoLista', MotoLista);

	MotoLista.$inject = ['motoDS'];

	function MotoLista(motoDS) {
		var vm = this;

		vm.motos   = [];
		vm.remover = remover;

		carregarTodos();

		function carregarTodos() {
			motoDS.listar().then(success).catch(error);

			function error(response) {
				vm.motos = [];
			}

			function success(response) {
				if (response.data.exec) {
					vm.motos = response.data.data;
				} else {
					vm.motos = [];
				}
			}
		}

		function remover(id) {
			motoDS.remover(id).then(success).catch(error);

			function error(response) {
				toastr['error']('Ocorreu um erro ao remover o registro');
			}

			function success(response) {
				if (response.data.exec) {
					toastr['success']('Sucesso ao remover o registro');
					carregarTodos();
				} else {
					toastr['error']('Ocorreu um erro ao remover o registro');
				}
			}
		}
	}
})();