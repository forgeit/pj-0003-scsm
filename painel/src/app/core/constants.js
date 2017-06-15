(function () {
	'use strict';

	var core = angular.module('painel');

	var configuracaoREST = {
		url: window.location.origin + '/server/'
	};

	core.constant('configuracaoREST', configuracaoREST);
	core.constant('toastr', toastr);
})();