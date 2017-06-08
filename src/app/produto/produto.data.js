(function () {
	'use strict';

	angular
		.module('app.produto')
		.factory('produtoDataService', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			carregar: carregar,
			carregarFiltro: carregarFiltro
		};

		return service;

		function carregar() {
			return $http.get(configuracaoREST.url + 'produto/carregar');
		}

		function carregarFiltro(secao, categoria) {
			return $http.get(configuracaoREST.url + 'produto/carregar/secao/' + secao + '/categoria/' + categoria);
		}
	}
})();