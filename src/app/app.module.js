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
		'app.moto', 
		'ngRoute', 
		'idf.br-filters',
		'angular-jwt',	
		'app.produto']);

})();