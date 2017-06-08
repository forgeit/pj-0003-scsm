(function () {

	'use strict';

	angular.module('app', [
		'app.layout', 
		'app.auth', 
		'app.home', 
		'app.carrinho', 
		'app.filtros', 
		'app.login', 
		'app.cliente', 
		'ngRoute', 
		'angular-jwt',	
		'app.produto']);

})();