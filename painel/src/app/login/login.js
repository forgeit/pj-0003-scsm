(function () {

	'use strict';

	angular
		.module('painel.login')
		.controller('Login', Login);

	Login.$inject = ['loginRest', 'AuthToken', '$rootScope', 'jwtHelper', '$location'];

	function Login(loginRest, AuthToken, $rootScope, jwtHelper, $location) {
		var vm = this;

		vm.logar = logar;
		vm.usuario = {};

		function logar(formulario) {
			$rootScope.usuarioLogado = {};
			loginRest.logar(vm.usuario).then(success).catch(error);

			function error(response) {
				toastr['error']("Ocorreu um erro ao entrar no sistema");
			}

			function success(response) {
				if (response.data.exec) {
					AuthToken.setar(response.data.data.token);

					var payload = jwtHelper.decodeToken(response.data.data.token);
					$rootScope.usuarioLogado.nome = payload.nome;
					$rootScope.usuarioLogado.cargo = payload.cargo;
					$rootScope.usuarioLogado.imagem = payload.imagem;

					toastr['success'](response.data.msg);

					$location.path('/');
				} else {
					toastr['error'](response.data.msg);
				}
			}
		}
	}

})();