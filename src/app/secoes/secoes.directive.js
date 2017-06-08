(function () {

	'use strict';

	angular
		.module('app.secoes')
		.directive('secoes', secoes);

	function secoes() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/secoes/secoes.html'
		};

		return directive;
	}

})();