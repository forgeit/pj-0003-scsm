(function () {
	'use strict';

	angular
		.module('app.cliente')
		.controller('NovoCliente', NovoCliente);

	NovoCliente.$inject = ['clienteDataService', '$location'];

	function NovoCliente(dataservice, $location) {
		var vm = this;

		vm.cadastroRapido = cadastroRapido;
		vm.usuario = {};
		vm.mensagemRetorno = '';
		vm.possuiErro = false;
		vm.cadastrar = 'Cadastrar';

		function cadastroRapido(form) {
			vm.possuiErro = false;

			if (form.$valid) {
				vm.cadastrar = "Aguarde...";

				if (vm.usuario.senha === vm.usuario.confirmacao) {
					dataservice.salvar(vm.usuario).then(success).catch(error);		
				} else {
					vm.possuiErro = true;
					vm.mensagemRetorno = 'A confirmação de senha informada é diferente da senha.';
					vm.cadastrar = "Cadastrar";
				}
			} else {
				vm.possuiErro = true;
				vm.mensagemRetorno = 'Verifique se os campos obrigatórios foram informados.';
				vm.cadastrar = "Cadastrar";
			}

			function error(response) {
				vm.cadastrar = "Cadastrar";
				vm.possuiErro = true;
				vm.mensagemRetorno = 'Ocorreu um erro ao registrar o usuário.';
			}

			function success(response) {
				vm.cadastrar = "Cadastrar";

				if (response.data) {
					if (response.data.exec) {

						$location.path('cadastro-sucesso');

					} else {
						vm.possuiErro = true;
						vm.mensagemRetorno = response.data.msg;	
					}

				} else {
					vm.possuiErro = true;
					vm.mensagemRetorno = 'Ocorreu um erro ao registrar o usuário.';
				}
			}	
		}
	}
})();