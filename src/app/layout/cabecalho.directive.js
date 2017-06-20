(function () {

	'use strict';

	angular
		.module('app.layout')
		.directive('cabecalho', cabecalho);

	function cabecalho() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/layout/cabecalho.html?v=32'
		};

		return directive;
	}

})();