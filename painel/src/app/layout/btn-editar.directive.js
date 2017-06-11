(function () {

	'use strict';

	angular
		.module('painel.layout')
		.directive('btnEditar', btnEditar);

	function btnEditar() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/layout/btn-editar.html'
		};

		return directive;
	}

})();