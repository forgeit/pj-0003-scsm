(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/detalhe/moto/:id', {
				templateUrl: 'src/app/moto/detalhe.html?v=32',
				controller: 'Detalhe',
				controllerAs: 'vm'
			});

		$locationProvider.html?v=325Mode(true);
	}

})();