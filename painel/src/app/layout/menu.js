(function () {

	'use strict';

	angular
		.module('painel.layout')
		.controller('Menu', Menu);

	Menu.$inject = ['$rootScope', 'AuthToken', 'jwtHelper'];

	function Menu($rootScope, AuthToken, jwtHelper) {
		var vm = this;

		vm.isLogged = isLogged;
		vm.sair = sair;

		carregar();

		function carregar() {
			if (AuthToken.ler()) {
				var payload = jwtHelper.decodeToken(AuthToken.ler());
				$rootScope.usuarioLogado = {};
				$rootScope.usuarioLogado.nome = payload.nome;
				$rootScope.usuarioLogado.cargo = payload.cargo;
				$rootScope.usuarioLogado.imagem = payload.imagem;
			}
		}

		function isLogged() {
			return !!AuthToken.ler();
		}

		function sair() {
			AuthToken.remover();
			controllerUtils.$location.path('/login');
		}
	}

})();