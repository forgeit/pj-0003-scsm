(function () {

	'use strict';

	angular
		.module('app.filtros')
		.directive('filtros', filtros);

	function filtros() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/filtros/filtros.html?v=2'
		};

		return directive;
	}

})();