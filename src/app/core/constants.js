(function () {
	'use strict';

	var core = angular.module('app');

	var configuracaoREST = {
		url: 'http://10.2.0.43/motoscs/server/'
	};

	core.constant('configuracaoREST', configuracaoREST);
	core.constant('toastr', toastr);
})();