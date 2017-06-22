(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/entrar', {
				templateUrl: 'src/app/cliente/cliente.html?v=3',
				controller: 'Cliente',
				controllerAs: 'vm',
			})
			.when('/registrar-usuario', {
				templateUrl: 'src/app/cliente/novo-cliente.html?v=3',
				controller: 'NovoCliente',
				controllerAs: 'vm',
			})
			.when('/cadastro-sucesso', {
				templateUrl: 'src/app/cliente/cadastro-sucesso.html?v=3',
				controller: 'CadastroSucesso',
				controllerAs: 'vm',
			});
	}

})();