(function () {
	
	'use strict';

	angular.module('painel.core', [
		'ngRoute', 
		'angular-loading-bar',
		'angular-jwt',
		'datatables', 
		'naif.base64',
		'ui.utils.masks',
		'ngStorage',
		'core.auth',
		'datatables.bootstrap']);

})();