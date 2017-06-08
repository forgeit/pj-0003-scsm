<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Moto extends MY_Controller {

	public function buscarTodos() {
		$retorno = $this->MotoModel->buscarTodosNativo('nome');
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}
}