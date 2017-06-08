<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Moto extends MY_Controller {

	public function buscarTodos() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$filtros = json_decode($data);
		sleep(2);// Apenas para teste local
		$retorno = $this->MotoModel->buscarTodosNativo($filtros);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}
}