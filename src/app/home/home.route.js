(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/buscar-produtos/secao/:idSecao/:nomeSecao/categoria/:idCategoria/:nomeCategoria', {
				templateUrl: 'src/app/home/home.html?v=2',
				controller: 'Home',
				controllerAs: 'vm',
				titulo: 'Página Inicial',
				cabecalho: {
					h1: 'Página Inicial',
					breadcrumbs: [
						{
							nome: 'Página Inicial',
							link: '/',
							ativo: true
						}
					]
				}
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

})();