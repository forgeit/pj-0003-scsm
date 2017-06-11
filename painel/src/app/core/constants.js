(function () {
	'use strict';

	var core = angular.module('painel');

	var configuracaoREST = {
		url: 'http://localhost/motoscs/server/'
	};

	core.constant('configuracaoREST', configuracaoREST);
	core.constant('toastr', toastr);
})();