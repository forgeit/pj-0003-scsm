<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends MY_Controller {

	public function entrar() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$usuario = json_decode($data);

		$this->load->library("JWT");

		if (!isset($usuario->login) || !isset($usuario->senha)) {
			print_r($this->criarRetorno(false, null, "Login e senha são obrigatórios."));
			die();
		}

		$usuario = $this->RevendaModel->verificarLogin($usuario->login, md5($usuario->senha));

		if ($usuario) {
			print_r($this->criarRetorno(true, array('token' => $this->generate_token($usuario[0])), "Sucesso ao autenticar, redirecionando."));
		} else {
			print_r($this->criarRetorno(false, null, "Dados informados são inválidos."));
			die();
		}
	}

	public function generate_token($usuario){
    	$this->load->library("JWT");
	    $CONSUMER_SECRET = 'sistema_revendas_2016';
	    $CONSUMER_TTL = 28800;
	    return $this->jwt->encode(array(
	   	  'id' => $usuario['id'],
	   	  'nome' => $usuario['nome'],
	      'issuedAt'=> date(DATE_ISO8601, strtotime("now")),
	      'dtBegin' => strtotime("now"),
	      'ttl'=> $CONSUMER_TTL
	    ), $CONSUMER_SECRET);
	}
}