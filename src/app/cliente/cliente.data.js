(function () {
	'use strict';

	angular
		.module('app.cliente')
		.factory('clienteDataService', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			entrar: entrar,
			salvar: salvar,
		};

		return service;

		function entrar(data) {
			return $http.post(configuracaoREST.url + 'usuarioSite/entrar', data);
		}

		function salvar(data) {
			return $http.post(configuracaoREST.url + 'usuarioSite/salvar', data);
		}
	}
})();