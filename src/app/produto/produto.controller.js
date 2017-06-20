(function () {

	'use strict';

	angular
		.module('app.produto')
		.controller('Produto', Produto);

	Produto.$inject = ['produtoDataService', '$localStorage', '$location', '$routeParams'];

	function Produto(dataservice, $localStorage, $location, $routeParams) {
		var vm = this;

		vm.adicionarCarrinho = adicionarCarrinho;
		vm.removerCarrinho = removerCarrinho;
		vm.produtos = [];
		vm.carrinho = $localStorage.carrinho;

		iniciar();

		function carregarProdutos() {

			if ($routeParams.idSecao && $routeParams.idCategoria) {
				return dataservice.carregarFiltro($routeParams.idSecao, $routeParams.idCategoria).then(success).catch(error);
			} else {
				return dataservice.carregar().then(success).catch(error);
			}

			function error() {}

			function success(response) {
				vm.produtos = response.data == 'null' ? [] : response.data;

				angular.forEach($localStorage.carrinho, function (value, index) {
					angular.forEach(vm.produtos, function (value2, index2) {
						if (value.id === value2.id) {
							value2.quantidade = value.quantidade;
						}
					});
				});
			}
		}

		function criarCarrinho() {
			if (!Array.isArray($localStorage.carrinho)) {
				$localStorage.carrinho = [];
			}
		}

		function removerCarrinho(produto) {
			angular.forEach($localStorage.carrinho, function (value, index) {
				if (produto.id == value.id) {
					if (value.quantidade == 1) {
						$localStorage.carrinho.splice(index, 1);
					}

					value.quantidade--;
					value.valor -= produto.valor;
					produto.quantidade--;
				}
			});			

			console.table($localStorage.carrinho);
		}

		function adicionarCarrinho(produto) {
			var jaPossui = false;

			angular.forEach($localStorage.carrinho, function (value, index) {
				if (produto.id == value.id) {
					value.valor += parseFloat(produto.valor);
					value.valorUnitario = produto.valor;
					value.imagem = produto.imagem;
					value.quantidade++;
					jaPossui = true;
					produto.quantidade++;
				}
			});

			if (!jaPossui) {
				produto.quantidade = 1;
				$localStorage.carrinho.push({
					id: produto.id,
					produto: produto.nome,
					quantidade: 1,
					valor: parseFloat(produto.valor),
					valorUnitario: produto.valor,
					imagem: produto.imagem
				});
			}
		}

		function iniciar() {
			carregarProdutos();
			criarCarrinho();
		}


	}

})();