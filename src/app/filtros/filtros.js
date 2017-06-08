(function () {

	'use strict';

	angular
		.module('app.filtros')
		.controller('Filtros', Filtros);

	Filtros.$inject = ['filtrosDS', '$routeParams', '$localStorage', 'motoDS'];

	function Filtros(filtrosDS, $routeParams, $localStorage, motoDS) {
		var vm = this;

		var CARREGANDO = { id: undefined, nome: 'Carregando'}
		var ERRO       = { id: undefined, nome: 'Erro ao carregar'};
		var MINIMO     = 1980;
		var SELECIONE  = { id: undefined, nome: 'Selecione'};
		
		vm.anos     = [CARREGANDO];
		vm.filtrar  = filtrar;
		vm.marcas   = [CARREGANDO];
		vm.revendas = [CARREGANDO];

		buscarAnos();
		buscarMarcas();
		buscarMotos();
		buscarRevendas();

		function buscarAnos() {
			var corrente = new Date().getFullYear();
			vm.anos = [SELECIONE];

			for (var inicio = corrente; inicio >= MINIMO; inicio--) {
				vm.anos.push({id: inicio, nome: inicio});
			}
		}

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

		function buscarMotos() {
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

		function filtrar() {
			motoDS.filtrar(vm.filtro).then(success).catch(error);

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