(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/carrinho', {
				templateUrl: 'src/app/carrinho/carrinho.html?v=32',
				controller: 'Carrinho',
				controllerAs: 'vm',
			});
	}

})();