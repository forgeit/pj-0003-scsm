(function () {
	'use strict';

	angular
		.module('app.moto')
		.factory('motoDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			filtrar: filtrar,
			listar: listar
		};

		return service;

		function filtrar(filtros) {
			return $http.post(configuracaoREST.url + 'moto/buscarTodos', filtros);
		}

		function listar() {
			return $http.get(configuracaoREST.url + 'moto/buscarTodos');
		}
	}
})();