(function () {

	'use strict';

	angular
		.module('app.moto')
		.controller('Detalhe', Detalhe);

	Detalhe.$inject = ['motoDS', '$routeParams', '$localStorage', '$location'];

	function Detalhe(motoDS, $routeParams, $localStorage, $location) {
		var vm = this;
		
		vm.motosSemelhantes = {};
		vm.detalhe = detalhe;

		buscarMotoSelecionada();
		buscarMotosSemelhantes();

		function buscarMotoSelecionada() {
			motoDS.buscarMotoSelecionada($routeParams.id).then(success).catch(error);

			function error(response) {
				vm.moto = [];
			} 

			function success(response) {
				if (response.data.exec) {
					vm.moto = response.data.data;
				} else {
					vm.moto = {};
				}
			} 
		}

		function buscarMotosSemelhantes() {
			motoDS.buscarMotosSemelhantes($routeParams.id).then(success).catch(error);

			function error(response) {
				vm.motosSemelhantes = [];
			} 

			function success(response) {
				if (response.data.exec) {
					vm.motosSemelhantes = response.data.data;
				} else {
					vm.motosSemelhantes = [];
				}
			} 
		}

		function detalhe(id) {
			$location.path('/detalhe/moto/' + id);
		}
	}

})();