(function () {
	'use strict';

	angular
		.module('app.moto')
		.factory('motoDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscar: buscar,
			buscarMotosSemelhantes: buscarMotosSemelhantes,
			buscarMotoSelecionada: buscarMotoSelecionada,
			filtrar: filtrar,
			listar: listar
		};

		return service;

		function buscar(id) {
			return $http.get(configuracaoREST.url + 'moto/buscar/' + id);
		}

		function buscarMotosSemelhantes(id) {
			return $http.get(configuracaoREST.url + 'moto/buscarSemelhantes/' + id);
		}

		function buscarMotoSelecionada(id) {
			return $http.get(configuracaoREST.url + 'moto/buscarSelecionada/' + id);	
		}

		function filtrar(filtros) {
			return $http.post(configuracaoREST.url + 'moto/buscarTodos', filtros);
		}

		function listar() {
			return $http.get(configuracaoREST.url + 'moto/buscarTodos');
		}
	}
})();