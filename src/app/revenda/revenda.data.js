(function () {
	'use strict';

	angular
		.module('app.revenda')
		.factory('revendaDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			listar: listar
		};

		return service;

		function listar() {
			return $http.get(configuracaoREST.url + 'revenda/listar');
		}
	}
})();