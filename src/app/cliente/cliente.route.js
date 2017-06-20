(function () {

	'use strict';

	angular
		.module('app')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/entrar', {
				templateUrl: 'src/app/cliente/cliente.html',
				controller: 'Cliente',
				controllerAs: 'vm',
			})
			.when('/registrar-usuario', {
				templateUrl: 'src/app/cliente/novo-cliente.html',
				controller: 'NovoCliente',
				controllerAs: 'vm',
			})
			.when('/cadastro-sucesso', {
				templateUrl: 'src/app/cliente/cadastro-sucesso.html',
				controller: 'CadastroSucesso',
				controllerAs: 'vm',
			});
	}

})();