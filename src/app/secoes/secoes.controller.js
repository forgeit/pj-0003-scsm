(function () {

	'use strict';

	angular
		.module('app.secoes')
		.controller('Secoes', Secoes);

	Secoes.$inject = ['secoesDataService', '$routeParams', '$localStorage'];

	function Secoes(secoesDataService, $routeParams, $localStorage) {
		var vm = this;

		
		
	}

})();