(function () {

	'use strict';

	angular
		.module('painel.layout')
		.directive('lista', lista);

	function lista() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/layout/lista.html'
		};

		return directive;
	}

})();