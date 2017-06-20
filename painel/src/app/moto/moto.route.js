(function () {

	'use strict';

	angular
		.module('painel')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/moto', {
				templateUrl: 'src/app/moto/moto-lista.html?v=1',
				controller: 'MotoLista',
				controllerAs: 'vm',
			})
			.when('/registrar-moto', {
				templateUrl: 'src/app/moto/registrar-moto.html?v=1?v=1',
				controller: 'Moto',
				controllerAs: 'vm',
			})
			.when('/registrar-moto/:id', {
				templateUrl: 'src/app/moto/registrar-moto.html?v=1?v=1',
				controller: 'Moto',
				controllerAs: 'vm',
			});
	}

})();