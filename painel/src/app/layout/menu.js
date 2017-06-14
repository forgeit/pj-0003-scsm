(function () {

	'use strict';

	angular
		.module('painel.layout')
		.controller('Menu', Menu);

	Menu.$inject = ['$rootScope', 'AuthToken', 'jwtHelper', '$location'];

	function Menu($rootScope, AuthToken, jwtHelper, $location) {
		var vm = this;

		vm.isLogged = isLogged;
		vm.sair = sair;

		carregar();

		function carregar() {
			if (AuthToken.ler()) {
				var payload = jwtHelper.decodeToken(AuthToken.ler());
				$rootScope.usuarioLogado = {};
				$rootScope.usuarioLogado.nome = payload.nome;
			}
		}

		function isLogged() {
			return !!AuthToken.ler();
		}

		function sair() {
			AuthToken.remover();
			$location.path('/login');
		}
	}

})();