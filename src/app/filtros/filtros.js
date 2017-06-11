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
			vm.carregando = true;
			motoDS.listar().then(success).catch(error);

			function error(response) {
				vm.carregando = false;
				vm.motos = [];
			} 

			function success(response) {
				vm.carregando = false;
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
			vm.carregando = true;
			motoDS.filtrar(vm.filtro).then(success).catch(error);

			function error(response) {
				vm.carregando = false;
				vm.motos = [];
			} 

			function success(response) {
				vm.carregando = false;
				filtrarExibicao();
				if (response.data.exec) {
					vm.motos = response.data.data;
				} else {
					vm.motos = [];
				}
			}
		}

		function filtrarExibicao() {
			if (vm.filtro) {
				vm.filtroExibicao = {};

				if (vm.filtro.marca) {
					vm.marcas.forEach(function (marca) {
						if (marca.id == vm.filtro.marca) {
							vm.filtroExibicao.marca = marca.nome;
						}
					});
				}

				if (vm.filtro.revenda) {
					vm.revendas.forEach(function (revenda) {
						if (revenda.id == vm.filtro.revenda) {
							vm.filtroExibicao.revenda = revenda.nome;
						}
					});
				}

				if (vm.filtro.anoInicial && vm.filtro.anoFinal) {
					vm.filtroExibicao.ano = "De " + vm.filtro.anoInicial + " até " + vm.filtro.anoFinal;
				} else if (vm.filtro.anoInicial){
					vm.filtroExibicao.ano = "Maior ou igual a " + vm.filtro.anoInicial;
				} else if (vm.filtro.anoFinal) {
					vm.filtroExibicao.ano = "Menor ou igual a " + vm.filtro.anoFinal;
				}

				if (vm.filtro.valorMin && vm.filtro.valorMax) {
					vm.filtroExibicao.ano = "De R$" + vm.filtro.valorMin + " até R$" + vm.filtro.valorMax;
				} else if (vm.filtro.valorMin){
					vm.filtroExibicao.ano = "Maior ou igual a R$" + vm.filtro.valorMin;
				} else if (vm.filtro.valorMax) {
					vm.filtroExibicao.ano = "Menor ou igual a R$" + vm.filtro.valorMax;
				}



			}
		}
		
		
	}

})();