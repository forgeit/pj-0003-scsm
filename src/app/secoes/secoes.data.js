(function () {
	'use strict';

	angular
		.module('app.secoes')
		.factory('secoesDataService', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscarTodos: buscarTodos,
		};

		return service;

		function buscarTodos() {
			return $http.get(configuracaoREST.url + 'secao/buscarView');
		}
	}
})();