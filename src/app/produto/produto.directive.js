(function () {

	'use strict';

	angular
		.module('app.produto')
		.directive('produto', produto);

	function produto() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/app/produto/produto.html?v=3'
		};

		return directive;
	}

})();