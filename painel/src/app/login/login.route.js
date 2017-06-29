(function () {

	'use strict';

	angular
		.module('painel')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'src/app/login/login.html?v=1',
				controller: 'Login',
				controllerAs: 'vm',
				notSecured: true
			});
	}

})();