(function () {
	'use strict';

	angular
		.module('painel.moto')
		.controller('Moto', Moto);

	Moto.$inject = ['motoDS', '$location', '$routeParams'];

	function Moto(motoDS, $location, $routeParams) {
		var vm = this;
		var CARREGANDO = { id: undefined, nome: 'Carregando'}
		var ERRO       = { id: undefined, nome: 'Erro ao carregar'};
		var MINIMO     = 1980;
		var SELECIONE  = { id: undefined, nome: 'Selecione'};
		
		vm.anos     = [CARREGANDO];
		vm.salvar = salvar;

		buscar();
		buscarAnos();
		buscarMarcas();

		function buscar() {
			if ($routeParams.id) {
				motoDS.buscar($routeParams.id).then(success).catch(error);
			}

			function error() {
				toastr['error']('Moto não encontrada.');
				$location.path('moto');
			}

			function success(response) {
				if (response.data.exec) {
					vm.moto = response.data.data;
				} else {
					toastr['error']('Moto não encontrada.');
					$location.path('moto');	
				}
			}
		}

		function buscarAnos() {
			var corrente = new Date().getFullYear();
			vm.anos = [SELECIONE];
			for (var inicio = corrente; inicio >= MINIMO; inicio--) {
				vm.anos.push({id: inicio.toString(), nome: inicio});
			}
		}

		function buscarMarcas() {
			motoDS.marcas().then(success).catch(error);

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

		function salvar(formulario) {
			if (formulario.$valid) {
				motoDS.salvar(vm.moto).then(success).catch(error);
			} else {
				toastr['error']('Verifique os campos obrigatórios!');
			}

			function error(response) {
				toastr['error']('Erro ao registrar a moto.');
			}

			function success(response) {
				if (response.data.exec) {
					$location.path('moto');
					toastr['success']('Sucesso ao registrar a moto.');
				} else {
					toastr['error']('Erro ao registrar a moto.');
				}
			}
		}

	}
})();