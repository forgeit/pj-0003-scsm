(function () {
	'use strict';

	angular
		.module('painel.mensagem')
		.factory('mensagemDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscar: buscar,
			buscarTotalNaoLidaPorRevenda: buscarTotalNaoLidaPorRevenda,
			listar: listar,
			remover: remover
		};

		return service;

		function buscar(id) {
			return $http.get(configuracaoREST.url + 'mensagem/buscar/' + id);
		}

		function buscarTotalNaoLidaPorRevenda() {
			return $http.get(configuracaoREST.url + 'mensagem/buscarTotalNaoLidaPorRevenda');
		}

		function listar() {
			return $http.get(configuracaoREST.url + 'mensagem/buscarTodosPorRevenda');
		}

		function remover(id) {
			return $http.get(configuracaoREST.url + 'mensagem/remover/' + id);
		}
	}
})();