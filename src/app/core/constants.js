(function () {

	'use strict';

	angular
		.module('app')
		.run(appRun)
		.config(routes);

	appRun.$inject = ['$rootScope', '$location', '$route'];
	routes.$inject = ['$routeProvider', '$locationProvider'];

	function appRun($rootScope, $location, $route) {
		setRouteEvents();

		function routeChangeError() {
	   		// console.log('Route Change Error');
	   	}

	   	function routeChangeStart(event, next, current) {
	   		// console.log('Route Change Start');
	   	}

	   	function routeChangeSuccess(event, current) {
	  //  		$rootScope.cabecalho = current.cabecalho;
			// $rootScope.titulo = current.titulo;
	   	}

		function setRouteEvents() {
	   		$rootScope.$on('$routeChangeError', routeChangeError);
			$rootScope.$on('$routeChangeStart', routeChangeStart);
			$rootScope.$on('$routeChangeSuccess', routeChangeSuccess);	
	   	}
	}

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'src/app/home/home.html?v=32',
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

		$locationProvider.html?v=325Mode(true);
	}

})();