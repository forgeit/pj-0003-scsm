(function () {

	angular
		.module('core.utils')
		.factory('controller', controller);

	controller.$inject = [
		'mensagem',
		'$routeParams',
		'multiPromise',
		'$location',
		'$q',
		'mensagemGlobal',
		'labelGlobal',
		'moduloGlobal',
		'programaGlobal',
		'configuracaoREST',
		'filtroMestreDetalhe',
		'hintGlobal',
		'placeholderGlobal'];

	function controller(
		mensagem, 
		$routeParams, 
		multiPromise, 
		$location, 
		$q, 
		mensagemGlobal, 
		labelGlobal, 
		moduloGlobal, 
		programaGlobal, 
		configuracaoREST, 
		filtroMestreDetalhe, 
		hintGlobal, 
		placeholderGlobal) {

		var service = {
			criarRetornoPromise: criarRetornoPromise,
			configuracaoREST: configuracaoREST,
			feed: mensagem.feed,
			feedMessage: mensagem.feedMessage,
			criarFiltroMestreDetalhe: filtroMestreDetalhe.get,
			hint: hintGlobal,
			label: labelGlobal,
			ler: ler,
			$location: $location,
			msg: mensagemGlobal,
			msgAttr: mensagem.msgAttr,
			messageType: mensagem.type,
			modulo: moduloGlobal,
			placeholder: placeholderGlobal,
			programa: programaGlobal,
			ready: multiPromise.ready,
			stringToDate: stringToDate,
			$routeParams: $routeParams,
			$q: $q
		};

		return service;

		function criarRetornoPromise(exec, objeto) {
			var retorno = {};
			retorno.exec = exec;
			retorno.objeto = objeto;
			return retorno;
		}

		function ler(data, value) {
			if (value === undefined) {
				return data.data.data;
			}

			return data.data.data[value];
		}

		function stringToDate(valor) {
			return valor == null ? null : moment(valor).toDate();
		}
	}
})();
