(function () {
	'use strict';

	var core = angular.module('app');

	var configuracaoREST = {
		url: 'http://localhost:3340/server/'
	};

	core.constant('configuracaoREST', configuracaoREST);
	core.constant('toastr', toastr);
})();