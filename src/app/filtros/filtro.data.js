(function () {
	'use strict';

	angular
		.module('app.filtros')
		.factory('filtrosDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			marcas: marcas,
			revendas: revendas
		};

		return service;

		function marcas() {
			return $http.get(configuracaoREST.url + 'marca/buscarTodos');
		}

		function revendas() {
			return $http.get(configuracaoREST.url + 'revenda/buscarTodos');
		}
	}
})();