<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Moto extends MY_Controller {

	public function buscar() {
		$retorno = $this->MotoModel->buscarRevendaNativo($this->uri->segment(3));
		$exec = count($retorno) > 0;

		if ($retorno) {
			$retorno['imagem'] = $this->convertStringToFileObject($retorno['imagem']);
			$retorno['img_aux_01'] = $this->convertStringToFileObject($retorno['img_aux_01']);
			$retorno['img_aux_02'] = $this->convertStringToFileObject($retorno['img_aux_02']);
			$retorno['img_aux_03'] = $this->convertStringToFileObject($retorno['img_aux_03']);
			$retorno['img_aux_04'] = $this->convertStringToFileObject($retorno['img_aux_04']);

			unset($retorno['imagem_home']);
			unset($retorno['img_aux_01_thumb']);
			unset($retorno['img_aux_02_thumb']);
			unset($retorno['img_aux_03_thumb']);
			unset($retorno['img_aux_04_thumb']);
			unset($retorno['id_revenda']);
			
		}

		print_r($this->criarRetorno($exec, $retorno));
	}

	public function buscarImagem() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$imagem = json_decode($data);

		$nome = null;

		if (!isset($imagem->nome)) {
			print_r($this->criarRetorno(false, null));
			die();
		}

		if ($imagem->nome == 'img_aux_01') {
			$nome = $imagem->nome;
		}

		if ($imagem->nome == 'img_aux_02') {
			$nome = $imagem->nome;
		}

		if ($imagem->nome == 'img_aux_03') {
			$nome = $imagem->nome;
		}

		if ($imagem->nome == 'img_aux_04') {
			$nome = $imagem->nome;
		}

		if ($nome != null) {
			$retorno = $this->MotoModel->buscarImagem($this->uri->segment(3), $imagem->nome);
			$exec = count($retorno) > 0;
		} else {
			$exec = false;
			$retorno = null;
		}
		
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function buscarSelecionada() {
		$retorno = $this->MotoModel->buscarSelecionadaNativo($this->uri->segment(3));
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function buscarSemelhantes() {
		$retorno = $this->MotoModel->buscarSemelhantesNativo($this->uri->segment(3));
		$exec = count($retorno) > 0;

		print_r($this->criarRetorno($exec, $retorno));
	}

	function convertStringToFileObject($string) {

		$array = explode(',', $string);

		return $string ? array (
			'filetype' => str_replace(';base64', '', str_replace('data:', '', $array[0])),
			'base64' => $array[1]
		) : $string;
	}

	public function buscarTodos() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$filtros = json_decode($data);
		$retorno = $this->MotoModel->buscarTodosNativo($filtros);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function buscarTodosPorRevenda() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$retorno = $this->MotoModel->buscarTodosRevendaNativo($this->revendaAtual);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function salvar() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);

		$moto = json_decode($data);
		$moto->id_revenda = $this->revendaAtual; //Remover, apenas para testes.
		
		$formularioValido = false;

		$formularioValido = isset($moto->nome) && strlen(trim($moto->nome)) > 0;
		$formularioValido = isset($moto->valor) && strlen(trim($moto->valor)) > 0 && $formularioValido;
		$formularioValido = isset($moto->ano) && strlen(trim($moto->ano)) > 0 && $formularioValido;
		$formularioValido = isset($moto->id_marca) && strlen(trim($moto->id_marca)) > 0 && $formularioValido;
		$formularioValido = isset($moto->imagem) && $formularioValido;

		if ($formularioValido) {

			if (!$this->validarTipoImagem($moto->imagem)) {
				print_r($this->criarRetorno(false, null, 'Imagem principal é inválida'));
			}

			if (isset($moto->img_aux_01) && $moto->img_aux_01 && !$this->validarTipoImagem($moto->img_aux_01)) {
				print_r($this->criarRetorno(false, null, 'Imagem 01 é inválida'));
			}

			if (isset($moto->img_aux_02) && !$this->validarTipoImagem($moto->img_aux_02)) {
				print_r($this->criarRetorno(false, null, 'Imagem 02 é inválida'));
			}

			if (isset($moto->img_aux_03) &&  !$this->validarTipoImagem($moto->img_aux_03)) {
				print_r($this->criarRetorno(false, null, 'Imagem 03 é inválida'));
			}

			if (isset($moto->img_aux_04) &&  !$this->validarTipoImagem($moto->img_aux_04)) {
				print_r($this->criarRetorno(false, null, 'Imagem 04 é inválida'));
			}

			$moto->imagem_home = $this->criarStringArquivo($moto->imagem, 150, 100);
			$moto->imagem = 'data:' . $moto->imagem->filetype . ';base64,' . $moto->imagem->base64;

			if (isset($moto->img_aux_01)) {
				$moto->img_aux_01_thumb = $this->criarStringArquivo($moto->img_aux_01, 50, 100);
				$moto->img_aux_01 = 'data:' . $moto->img_aux_01->filetype . ';base64,' . $moto->img_aux_01->base64;
			} else {
				$moto->img_aux_01 = null;
				$moto->img_aux_01_thumb = null;
			}

			if (isset($moto->img_aux_02)) {
				$moto->img_aux_02_thumb = $this->criarStringArquivo($moto->img_aux_02, 50, 100);
				$moto->img_aux_02 = 'data:' . $moto->img_aux_02->filetype . ';base64,' . $moto->img_aux_02->base64;
			} else {
				$moto->img_aux_02 = null;
				$moto->img_aux_02_thumb = null;
			}

			if (isset($moto->img_aux_03)) {
				$moto->img_aux_03_thumb = $this->criarStringArquivo($moto->img_aux_03, 50, 100);
				$moto->img_aux_03 = 'data:' . $moto->img_aux_03->filetype . ';base64,' . $moto->img_aux_03->base64;
			} else {
				$moto->img_aux_03 = null;
				$moto->img_aux_03_thumb = null;
			}

			if (isset($moto->img_aux_04)) {
				$moto->img_aux_04_thumb = $this->criarStringArquivo($moto->img_aux_04, 50, 100);
				$moto->img_aux_04 = 'data:' . $moto->img_aux_04->filetype . ';base64,' . $moto->img_aux_04->base64;
			} else {
				$moto->img_aux_04 = null;
				$moto->img_aux_04_thumb = null;
			}

			if (!isset($moto->data_cadastro)) {
				$moto->data_cadastro = date('Y-m-d');
			}

			$retorno = isset($moto->id) ? $this->MotoModel->atualizar($moto->id, $moto) : $this->MotoModel->inserir($moto);

			if ($retorno) {
				print_r($this->criarRetorno(true, null, 'Sucesso ao registrar.'));
			} else {
				print_r($this->criarRetorno(false, null, 'Erro ao registrar.'));
			}
		} else {
			print_r($this->criarRetorno(false, null, 'Verifique se os dados obrigatórios foram informados.'));
		}

	}

	public function remover() {
		$retorno = $this->MotoModel->excluir($this->uri->segment(3));

		if ($retorno) {
			print_r($this->criarRetorno(true, null, 'Sucesso ao remover.'));
		} else {
			print_r($this->criarRetorno(false, null, 'Erro ao remover.'));
		}
	}

	private function validarTipoImagem($imagem) {
		if ($imagem) {
			return $imagem->filetype === 'image/jpeg' || $imagem->filetype === 'image/jpg' || $imagem->filetype === 'image/png';
		} else {
			return true;
		}
	}
}