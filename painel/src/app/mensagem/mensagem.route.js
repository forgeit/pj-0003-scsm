(function () {

	'use strict';

	angular
		.module('painel')
		.config(routes);

	routes.$inject = ['$routeProvider', '$locationProvider'];

	function routes($routeProvider, $locationProvider) {
		$routeProvider
			.when('/mensagem', {
				templateUrl: 'src/app/mensagem/mensagem.html',
				controller: 'Mensagem',
				controllerAs: 'vm',
				notSecured: true
			})
			.when('/ver-mensagem/:id', {
				templateUrl: 'src/app/mensagem/mensagem-ver.html',
				controller: 'MensagemVer',
				controllerAs: 'vm',
				notSecured: true
			});
	}

})();