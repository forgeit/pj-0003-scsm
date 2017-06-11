(function () {

	'use strict';

	angular
		.module('painel.layout')
		.directive('menuTopo', menu);

	function menu() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/layout/menu.html'
		};

		return directive;
	}

})();