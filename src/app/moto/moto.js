(function () {

	'use strict';

	angular
		.module('app.moto')
		.controller('Moto', Moto);

	Moto.$inject = ['motoDS', '$routeParams', '$localStorage', '$location'];

	function Moto(motoDS, $routeParams, $localStorage, $location) {
		var vm = this;
		
		vm.motos = [];

		buscarTodos();

		function buscarTodos() {
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