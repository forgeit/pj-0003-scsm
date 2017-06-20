(function () {

	'use strict';

	angular
		.module('app.layout')
		.directive('rodape', rodape);

	function rodape() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/layout/rodape.html?v=1'
		};

		return directive;
	}

})();