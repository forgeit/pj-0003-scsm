(function () {
	'use strict';

	angular
		.module('painel.revenda')
		.controller('Revenda', Revenda);

	Revenda.$inject = ['revendaDS', '$location', '$routeParams'];

	function Revenda() {
		var vm = this;

		vm.cidades = [
			{id: undefined, nome: "Selecione"},
			{id: "Santa Cruz do Sul", nome: "Santa Cruz do Sul"}
		];
	}

})();