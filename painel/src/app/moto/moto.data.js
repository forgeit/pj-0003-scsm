(function () {
	'use strict';

	angular
		.module('painel.moto')
		.factory('motoDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscar: buscar,
			listar: listar,
			marcas: marcas,
			remover: remover,
			salvar: salvar
		};

		return service;

		function buscar(id) {
			return $http.get(configuracaoREST.url + 'moto/buscar/' + id);
		}

		function listar() {
			return $http.get(configuracaoREST.url + 'moto/buscarTodosPorRevenda');
		}

		function marcas() {
			return $http.get(configuracaoREST.url + 'marca/buscarTodos');
		}

		function remover(id) {
			return $http.get(configuracaoREST.url + 'moto/remover/' + id);
		}

		function salvar(data) {
			return $http.post(configuracaoREST.url + 'moto/salvar', data);	
		}
	}
})();