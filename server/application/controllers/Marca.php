<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Marca extends MY_Controller {

	public function buscarTodos() {
		$retorno = $this->MarcaModel->buscarTodos();
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));

	}
	
}