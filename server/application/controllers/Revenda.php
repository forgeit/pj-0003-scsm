<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Revenda extends MY_Controller {

	public function buscarTodos() {
		$retorno = $this->RevendaModel->buscarTodos('nome');
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));

	}
	
}