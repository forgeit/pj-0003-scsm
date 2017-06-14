(function () {

	'use strict';

	angular
		.module('painel')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'src/app/login/login.html?' + new Date().getTime(),
				controller: 'Login',
				controllerAs: 'vm',
				notSecured: true
			});
	}

})();