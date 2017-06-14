(function () {
	'use strict';

	angular
		.module('painel.revenda')
		.factory('revendaDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscar: buscar
		};

		return service;

		function buscar(id) {
			return $http.get(configuracaoREST.url + 'revenda/buscar');
		}
	}
})();