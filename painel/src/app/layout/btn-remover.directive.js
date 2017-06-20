(function () {

	'use strict';

	angular
		.module('painel.layout')
		.directive('btnRemover', btnRemover);

	function btnRemover() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/layout/btn-remover.html?v=1'
		};

		return directive;
	}

})();