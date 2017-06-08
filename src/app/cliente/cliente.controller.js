(function () {
	'use strict';

	angular
		.module('app.cliente')
		.controller('Cliente', Cliente);

	Cliente.$inject = ['clienteDataService', '$location', '$sessionStorage', 'jwtHelper', '$rootScope', 'AuthToken'];

	function Cliente(dataservice, $location, $sessionStorage, jwtHelper, $rootScope, AuthToken) {
		var vm = this;

		vm.usuario = {};
		vm.mensagemRetorno = '';
		vm.possuiErro = false;
		vm.entrar = entrar;

		function entrar(form) {
			$rootScope.usuarioLogado = {};

			if (form.$valid) {
				var dataPost = {
					login: btoa(vm.usuario.login),
					senha: btoa(vm.usuario.senha)
				}

				dataservice.entrar(dataPost).then(success).catch(error);
			} else {
				vm.mensagemRetorno = "Informe o login e senha para entrar no sistema.";
				vm.possuiErro = true;
			}

			function error(response) {
				vm.mensagemRetorno = "Ocorreu um erro ao efetuar a login.";
				vm.possuiErro = true;
			}

			function success(response) {
				if (response.data.exec) {
					var payload = jwtHelper.decodeToken(response.data.data);
					$rootScope.usuarioLogado.nome = payload.nome;
					AuthToken.setar(response.data.data);
					$location.path('/');
				} else {
					vm.mensagemRetorno = response.data.msg;
					vm.possuiErro = true;
				}
			}
			
		}

	}
})();