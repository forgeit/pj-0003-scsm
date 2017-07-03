(function () {

	'use strict';

	angular
		.module('app.revenda')
		.controller('Revenda', Revenda);

	Revenda.$inject = ['revendaDS', '$routeParams', '$localStorage', '$location'];

	function Revenda(revendaDS, $routeParams, $localStorage, $location) {
		var vm = this;
		
		vm.revendas = [];


		buscarTodos();

		function buscarTodos() {
			revendaDS.listar().then(success).catch(error);

			function error(response) {
				vm.revendas = [];
			} 

			function success(response) {
				if (response.data.exec) {
					vm.revendas = response.data.data;
				} else {
					vm.revendas = [];
				}
			} 
		}
	}

})();