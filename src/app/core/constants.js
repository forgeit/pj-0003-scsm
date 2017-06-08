(function () {
	'use strict';

	var core = angular.module('app');

	var configuracaoREST = {
		url: 'http://localhost/mercado-digital/server/'
	};

	core.constant('configuracaoREST', configuracaoREST);
	core.constant('toastr', toastr);
})();