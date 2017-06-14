(function () {
	'use strict';

	angular
		.module('painel.revenda')
		.controller('Revenda', Revenda);

	Revenda.$inject = ['revendaDS', '$location', '$routeParams'];

	function Revenda(revendaDS, $location) {
		var vm = this;

		vm.cidades = [
			{id: null, nome: "Selecione"},
			{id: "Santa Cruz do Sul", nome: "Santa Cruz do Sul"}
		];

		vm.salvar = salvar;

		buscar();

		function buscar() {
			revendaDS.buscar().then(success).catch(error);

			function error() {
				toastr['error']('Erro ao carregar a revenda.');
				$location.path('/');
			}

			function success(response) {
				if (response.data.exec) {
					vm.revenda = response.data.data;
				} else {
					toastr['error']('Erro ao carregar a revenda.');
					$location.path('/');
				}
			}
		}

		function salvar(formulario) {
			if (formulario.$valid) {
				revendaDS.salvar(vm.revenda).then(success).catch(error);
			} else {
				toastr['error']('Verifique os campos obrigatórios!');
			}

			function error(response) {
				toastr['error']('Erro ao atualizar a revenda.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr['success']('Sucesso ao atualizar a revenda.');
				} else {
					toastr['error']('Erro ao atualizar a revenda.');
				}
			}
		}
	}

})();