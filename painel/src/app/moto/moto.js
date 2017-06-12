(function () {
	'use strict';

	angular
		.module('painel.moto')
		.controller('Moto', Moto);

	Moto.$inject = ['motoDS'];

	function Moto(motoDS) {
		var vm = this;
		var CARREGANDO = { id: undefined, nome: 'Carregando'}
		var ERRO       = { id: undefined, nome: 'Erro ao carregar'};
		var MINIMO     = 1980;
		var SELECIONE  = { id: undefined, nome: 'Selecione'};
		
		vm.anos     = [CARREGANDO];
		vm.salvar = salvar;

		buscarAnos();
		buscarMarcas();

		function buscarAnos() {
			var corrente = new Date().getFullYear();
			vm.anos = [SELECIONE];

			for (var inicio = corrente; inicio >= MINIMO; inicio--) {
				vm.anos.push({id: inicio, nome: inicio});
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
				console.log(response);
			}

			function success() {
				console.log(response);
			}
		}

	}
})();