(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/minha-conta', {
				templateUrl: 'src/app/painel-usuario/painel-usuario.html',
				controller: 'PainelUsuario',
				controllerAs: 'vm',
			});
	}

})();