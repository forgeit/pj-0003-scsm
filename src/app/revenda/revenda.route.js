(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/revenda', {
				templateUrl: 'src/app/revenda/revenda.html?v=6',
				controller: 'Revenda',
				controllerAs: 'vm'
			});

		$locationProvider.html5Mode(true);
	}

})();