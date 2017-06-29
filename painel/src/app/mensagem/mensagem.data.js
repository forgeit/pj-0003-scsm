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

		function listar(data) {
			return $http.post(configuracaoREST.url + 'mensagem/buscarTodosPorRevenda', data);
		}

		function remover(id) {
			return $http.post(configuracaoREST.url + 'mensagem/remover/', {id: id});
		}
	}
})();