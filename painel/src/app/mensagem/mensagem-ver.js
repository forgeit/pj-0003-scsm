(function () {
	'use strict';

	angular
		.module('painel.mensagem')
		.controller('MensagemVer', MensagemVer);

	MensagemVer.$inject = ['mensagemDS', '$location', '$routeParams'];

	function MensagemVer(mensagemDS, $location, $routeParams) {
		var vm = this;

		buscar();

		function buscar() {
			mensagemDS.buscar($routeParams.id).then(success).catch(error);

			function error(response) {
				$location.path('/mensagem');
				toastr['error']('Erro ao carregar a mensagem.');
			}

			function success(response) {
				if (response.data.exec) {
					vm.mensagem = response.data.data;
				} else {
					toastr['error']('Erro ao carregar a mensagem.');
				}
			}
		}
	}
})();