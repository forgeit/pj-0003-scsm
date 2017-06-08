<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Moto extends MY_Controller {

	public function buscarTodos() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$filtros = json_decode($data);
		$retorno = $this->MotoModel->buscarTodosNativo($filtros);
		$exec = count($retorno);
		print_r($this->criarRetorno($exec, $retorno));
	}
}