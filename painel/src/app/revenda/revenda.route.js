(function () {

	'use strict';

	angular
		.module('painel')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/meus-dados', {
				templateUrl: 'src/app/revenda/revenda.html?v=1',
				controller: 'Revenda',
				controllerAs: 'vm',
			});
	}

})();