(function () {

	'use strict';

	angular
		.module('app.filtros')
		.controller('Filtros', Filtros);

	Filtros.$inject = ['filtrosDS', '$routeParams', '$localStorage'];

	function Filtros(filtrosDS, $routeParams, $localStorage) {
		var vm = this;

		var CARREGANDO = { id: undefined, nome: 'Carregando'}
		var ERRO       = { id: undefined, nome: 'Erro ao carregar'};
		var SELECIONE  = { id: undefined, nome: 'Selecione'};
		
		vm.marcas   = [CARREGANDO];
		vm.revendas = [CARREGANDO];

		buscarMarcas();
		buscarRevendas();

		function buscarMarcas() {
			filtrosDS.marcas().then(success).catch(error);

			function error(response) {
				vm.marcas = [ERRO];
			} 

			function success(response) {
				if (response.data.exec) {
					vm.marcas = response.data.data;
					vm.marcas.unshift(SELECIONE);
				} else {
					vm.marcas = [ERRO];
				}
			} 
		}

		function buscarRevendas() {
			filtrosDS.revendas().then(success).catch(error);

			function error(response) {
				vm.revendas = [ERRO];
			} 

			function success(response) {
				if (response.data.exec) {
					vm.revendas = response.data.data;
					vm.revendas.unshift(SELECIONE);
				} else {
					vm.revendas = [ERRO];
				}
			} 
		}
		
		
	}

})();