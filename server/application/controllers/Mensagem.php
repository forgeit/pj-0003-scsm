<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mensagem extends MY_Controller {

	public function buscarTodosPorRevenda() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$retorno = $this->MensagemModel->buscarTodosRevendaNativo($this->revendaAtual);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function buscarTotalNaoLidaPorRevenda() {
		$retorno = $this->MensagemModel->buscarTotalNaoLidaPorRevendaNativo($this->revendaAtual);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function entrarEmContato() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$mensagem = json_decode($data);

		$formularioValido = false;

		$formularioValido = isset($mensagem->nome) && strlen(trim($mensagem->nome)) > 0;
		$formularioValido = isset($mensagem->texto) && strlen(trim($mensagem->texto)) > 0 && $formularioValido;
		$formularioValido = isset($mensagem->id_moto) && strlen(trim($mensagem->id_moto)) > 0 && $formularioValido;

		if ($formularioValido) {
			$retorno = $this->MensagemModel->inserir($mensagem);

			if ($retorno) {
				print_r($this->criarRetorno(true, null, 'Sucesso ao registrar.'));
			} else {
				print_r($this->criarRetorno(false, null, 'Erro ao registrar.'));
			}	
		} else {
			print_r($this->criarRetorno(false, null, 'Ìnforme os campos obrigatórios.'));
		}
		
	}

}