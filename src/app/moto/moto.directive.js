(function () {

	'use strict';

	angular
		.module('app.moto')
		.directive('moto', moto);

	function moto() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/moto/moto.html?v=1'
		};

		return directive;
	}

})();