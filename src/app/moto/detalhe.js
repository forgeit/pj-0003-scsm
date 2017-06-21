(function () {

	'use strict';

	angular
		.module('app.moto')
		.controller('Detalhe', Detalhe);

	Detalhe.$inject = ['motoDS', '$routeParams', '$localStorage', '$location'];

	function Detalhe(motoDS, $routeParams, $localStorage, $location) {
		var vm = this;
		
		vm.carregandoDados            = true;
		vm.carregandoMotosSemelhantes = true;
		vm.detalhe                    = detalhe;
		vm.motosSemelhantes           = {};
		vm.trocarImagemPrincipal 	  = trocarImagemPrincipal;
			
		buscarMotoSelecionada();
		buscarMotosSemelhantes();

		function detalhe(id) {
			$location.path('/detalhe/moto/' + id);
		}

		function buscarMotoSelecionada() {
			vm.carregandoDados = true;
			motoDS.buscarMotoSelecionada($routeParams.id).then(success).catch(error);

			function error(response) {
				vm.carregandoDados = false;
				vm.moto = [];
			} 

			function success(response) {
				vm.carregandoDados = false;
				if (response.data.exec) {
					vm.moto = response.data.data;
					trocarImagemPrincipal(response.data.data.imagem);
				} else {
					vm.moto = {};
				}
			} 
		}

		function buscarMotosSemelhantes() {
			vm.carregandoMotosSemelhantes = true;
			motoDS.buscarMotosSemelhantes($routeParams.id).then(success).catch(error);

			function error(response) {
				vm.carregandoMotosSemelhantes = false;
				vm.motosSemelhantes = [];
			} 

			function success(response) {
				vm.carregandoMotosSemelhantes = false;
				if (response.data.exec) {
					vm.motosSemelhantes = response.data.data;
				} else {
					vm.motosSemelhantes = [];
				}
			} 
		}

		function trocarImagemPrincipal(imagem) {
			vm.imagemAtual = imagem;
		}
	}

})();