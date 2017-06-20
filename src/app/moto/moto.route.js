(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/detalhe/moto/:id', {
				templateUrl: 'src/app/moto/detalhe.html?v=1',
				controller: 'Detalhe',
				controllerAs: 'vm'
			});

		$locationProvider.html5Mode(true);
	}

})();