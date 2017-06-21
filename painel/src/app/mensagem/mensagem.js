(function () {
	'use strict';

	angular
		.module('painel.mensagem')
		.controller('Mensagem', Mensagem);

	Mensagem.$inject = ['mensagemDS', '$location', '$routeParams'];

	function Mensagem(mensagemDS, $location, $routeParams) {
		var vm = this;

	}
})();