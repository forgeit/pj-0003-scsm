<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

	protected $revendaAtual = 0;

	public function __construct() {
		parent::__construct();	

		$seguro = false;

		foreach ($this->rotasSeguras() as $key => $value) {
			if ($this->uri->uri_string == $value)  {
				$seguro = true;
			}
		}

		if ($seguro) {
			if ($this->input->get_request_header('Authorization')) {
				$code = str_replace("Bearer ", "", $this->input->get_request_header('Authorization'));
				$this->load->library("JWT");

				try {
					$CONSUMER_SECRET = 'sistema_revendas_2016';

					$retorno = $this->jwt->decode($code, $CONSUMER_SECRET, true);

					if (!$retorno) {
						header('HTTP/1.1 401 Unauthorized', true, 401);
						die();
					} else {
						$diff = abs(strtotime("now") - $retorno->dtBegin);

						if ($diff > $retorno->ttl) {
							header('HTTP/1.1 401 Unauthorized', true, 401);
							die();
						} else {
							$this->revendaAtual = $retorno->id;
						}
					}
				} catch(Exception $ex) {
					header('HTTP/1.1 401 Unauthorized', true, 401);
					die();
				}
			} else {
				header('HTTP/1.1 401 Unauthorized', true, 401);
				die();
			}
		}
	}

	protected function criarRetorno($exec, $data, $msg = null) {
		return json_encode(array('exec' => $exec, 'data' => $data, 'msg' => $msg));
	} 

	protected function criarStringArquivo($imagem, $altura, $qualidade = 70) {
		require_once('application/libraries/ImageResize.php');
		$image = ImageResize::createFromString(base64_decode($imagem->base64));
		$image->quality_jpg = $qualidade;
		$image->resizeToHeight($altura);		
		return 'data:' . $imagem->filetype . ';base64,' . base64_encode($image->__toString());
	}

	private function rotasSeguras() {
		$rotas = array();

		$rotas[] = 'revenda/buscar';
		$rotas[] = 'revenda/atualizar';
		$rotas[] = 'moto/buscarTodosPorRevenda';
		$rotas[] = 'mensagem/buscarTotalNaoLidaPorRevenda';
		$rotas[] = 'mensagem/buscarTodosPorRevenda';
		$rotas[] = 'moto/salvar';
		$rotas[] = 'moto/buscar';
		$rotas[] = 'mensagem/remover';
		$rotas[] = 'mensagem/buscar';
		$rotas[] = 'moto/buscarTotalizadores';

		return $rotas;

	}
}