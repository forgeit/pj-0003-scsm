(function () {
	'use strict';

	angular
		.module('painel.moto')
		.controller('MotoLista', MotoLista);

	MotoLista.$inject = ['motoDS'];

	function MotoLista(motoDS) {
		var vm = this;

		vm.motos = [];

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
	}
})();