(function () {

	'use strict';

	angular
		.module('app.moto')
		.controller('Detalhe', Detalhe);

	Detalhe.$inject = ['motoDS', '$routeParams', '$localStorage', '$location'];

	function Detalhe(motoDS, $routeParams, $localStorage, $location) {
		var vm = this;

		vm.DETALHES = 1;
		vm.REVENDA  = 2;

		vm.abaAtual                   = vm.DETALHES;
		vm.carregandoDados            = true;
		vm.carregandoMotosSemelhantes = true;
		vm.detalhe                    = detalhe;
		vm.entrarEmContato			  = entrarEmContato;
		vm.motosSemelhantes           = {};
		vm.trocarAba                  = trocarAba;
		vm.trocarImagemPrincipal      = trocarImagemPrincipal;
		
		buscarMotoSelecionada();
		buscarMotosSemelhantes();

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

		function detalhe(id) {
			$location.path('/detalhe/moto/' + id);
		}

		function entrarEmContato(formulario) {
			if (formulario.$valid) {
				motoDS.entrarEmContato(vm.contato).then(success).catch(error);
			} else {
				toastr['error']('Informe os dados necessário para entrar em contato.');
			}

			function error(response) {
				toastr['error']('Ocorreu um erro ao enviar sua mensagem.');	
			}

			function success(response) {
				if (response.data.exec) {
					toastr['success']('Sua mensagem foi enviada com sucesso.');	
					delete vm.contato;
				} else {
					toastr['error']('Ocorreu um erro ao enviar sua mensagem.');		
				}
			}
		}

		function trocarAba(id) {
			vm.abaAtual = id;
		}

		function trocarImagemPrincipal(imagem) {
			vm.imagemAtual = imagem;
		}
	}

})();