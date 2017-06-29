<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mensagem extends MY_Controller {

	public function buscarTodosPorRevenda() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$dadosTabela = json_decode($data);

		$total = $this->MensagemModel->buscarTotalRevendaNativo($this->revendaAtual);
		$retorno = $this->MensagemModel->buscarTodosRevendaNativo($this->revendaAtual, $dadosTabela);
		$exec = count($retorno) > 0;

		$array = array(
			'draw' => $dadosTabela->draw,
			'recordsTotal' => $total['total'],
			'recordsFiltered' => $total['total'],
			'data' => $retorno
			);

		print_r($this->criarRetorno($exec, $array));
	}

	public function buscarTotalNaoLidaPorRevenda() {
		$retorno = $this->MensagemModel->buscarTotalNaoLidaPorRevendaNativo($this->revendaAtual);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function remover() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$mensagem = json_decode($data);
		$retorno = $this->MensagemModel->excluir($mensagem->id);
		if ($retorno) {
			print_r($this->criarRetorno(true, null, 'Sucesso ao remover.'));
		} else {
			print_r($this->criarRetorno(false, null, 'Erro ao remover.'));
		}
	}

	public function entrarEmContato() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$mensagem = json_decode($data);

		$formularioValido = false;

		$formularioValido = isset($mensagem->nome) && strlen(trim($mensagem->nome)) > 0;
		$formularioValido = isset($mensagem->texto) && strlen(trim($mensagem->texto)) > 0 && $formularioValido;
		$formularioValido = isset($mensagem->id_moto) && strlen(trim($mensagem->id_moto)) > 0 && $formularioValido;

		if ($formularioValido) {

			$mensagem->ts_recebido = date('Y-m-d H:i:s');

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