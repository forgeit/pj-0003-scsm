(function () {
	'use strict';

	angular
		.module('app.moto')
		.factory('motoDS', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST'];

	function dataservice($http, $location, $q, configuracaoREST) {
		var service = {
			buscar: buscar,
			buscarImagem: buscarImagem,
			buscarMotosSemelhantes: buscarMotosSemelhantes,
			buscarMotoSelecionada: buscarMotoSelecionada,
			entrarEmContato: entrarEmContato,
			filtrar: filtrar,
			listar: listar
		};

		return service;

		function buscar(id) {
			return $http.get(configuracaoREST.url + 'moto/buscar/' + id);
		}

		function buscarImagem(id, imagem) {
			return $http.post(configuracaoREST.url + 'moto/buscarImagem/' + id, imagem);
		}

		function buscarMotosSemelhantes(id) {
			return $http.get(configuracaoREST.url + 'moto/buscarSemelhantes/' + id);
		}

		function buscarMotoSelecionada(id) {
			return $http.get(configuracaoREST.url + 'moto/buscarSelecionada/' + id);	
		}

		function entrarEmContato(mensagem) {
			return $http.post(configuracaoREST.url + 'mensagem/entrarEmContato', mensagem);
		}

		function filtrar(filtros) {
			return $http.post(configuracaoREST.url + 'moto/buscarTodos', filtros);
		}

		function listar(pagina) {
			return $http.get(configuracaoREST.url + 'moto/buscarTodos' + (pagina ? '/' + pagina : ''));
		}
	}
})();