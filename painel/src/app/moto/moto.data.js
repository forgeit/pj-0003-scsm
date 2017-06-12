(function () {
	'use strict';

	angular
		.module('painel.moto')
		.factory('motoDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			listar: listar,
			marcas: marcas,
			salvar: salvar
		};

		return service;

		function listar() {
			return $http.get(configuracaoREST.url + 'moto/buscarTodosPorRevenda');
		}

		function marcas() {
			return $http.get(configuracaoREST.url + 'marca/buscarTodos');
		}

		function salvar(data) {
			return $http.post(configuracaoREST.url + 'moto/salvar', data);	
		}
	}
})();