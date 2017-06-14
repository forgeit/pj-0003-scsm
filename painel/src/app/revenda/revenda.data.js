(function () {
	'use strict';

	angular
		.module('painel.revenda')
		.factory('revendaDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscar: buscar,
			salvar: salvar
		};

		return service;

		function buscar(id) {
			return $http.get(configuracaoREST.url + 'revenda/buscar');
		}

		function salvar(dados) {
			return $http.post(configuracaoREST.url + 'revenda/atualizar', dados);
		}
	}
})();