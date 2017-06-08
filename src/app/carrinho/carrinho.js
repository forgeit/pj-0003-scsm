(function () {

	'use strict';

	angular
		.module('app.carrinho')
		.controller('Carrinho', Carrinho);

	Carrinho.$inject = ['$localStorage', '$scope'];

	function Carrinho($localStorage, $scope) {
		var vm = this;

		vm.carrinho = $localStorage.carrinho;
		vm.adicionarCarrinho = adicionarCarrinho;
		vm.removerCarrinho = removerCarrinho;
		vm.valorTotal = 0;	

		init();

		function init() {
			setarValorTotal();
		}

		function setarValorTotal() {
			vm.valorTotal = 0;
			vm.carrinho.forEach(function (value) {
				vm.valorTotal += value.valor;
			});
		}

		function removerCarrinho(produto) {
			produto.quantidade--;
			produto.valor = produto.quantidade * produto.valorUnitario;

			if (produto.quantidade == 0) {
				$localStorage.carrinho.forEach(function (value, index) {
					if (value.id === produto.id) {
						$localStorage.carrinho.splice(index, 1);
					}
				});
			}

			setarValorTotal();
		}

		function adicionarCarrinho(produto) {
			produto.quantidade++;
			produto.valor = produto.quantidade * produto.valorUnitario;
			setarValorTotal();
		}		

	}

})();