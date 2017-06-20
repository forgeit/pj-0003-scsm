(function () {

	'use strict';

	angular
		.module('app.login')
		.controller('Login', Login);

	Login.$inject = ['$sessionStorage', '$location', '$routeParams', 'AuthToken', 'jwtHelper', '$rootScope'];

	function Login($sessionStorage, $location, $routeParams, AuthToken, jwtHelper, $rootScope) {
		var vm = this;

		vm.sair = sair;

		init();

		function init() {
			$rootScope.usuarioLogado = {};
			
			if (AuthToken.ler()) {
				var payload = jwtHelper.decodeToken(AuthToken.ler());
				$rootScope.usuarioLogado.nome = payload.nome;
			}
		}	

		function sair() {
			AuthToken.remover();
			$rootScope.usuarioLogado = {};
			$location.path('/');
		}
	}

})();