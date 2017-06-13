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
		}

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
		// sleep(1);// Apenas para teste local
		$retorno = $this->MotoModel->buscarTodosNativo($filtros);
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function buscarTodosPorRevenda() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$retorno = $this->MotoModel->buscarTodosRevendaNativo();
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));
	}

	public function salvar() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$moto = json_decode($data);

		$moto->id_revenda = 1; //Remover, apenas para testes.
		
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

			$moto->imagem = 'data:' . $moto->imagem->filetype . ';base64,' . $moto->imagem->base64;

			if (isset($moto->img_aux_01)) {
				$moto->img_aux_01 = 'data:' . $moto->img_aux_01->filetype . ';base64,' . $moto->img_aux_01->base64;
			}

			if (isset($moto->img_aux_02)) {
				$moto->img_aux_02 = 'data:' . $moto->img_aux_02->filetype . ';base64,' . $moto->img_aux_02->base64;
			}

			if (isset($moto->img_aux_03)) {
				$moto->img_aux_03 = 'data:' . $moto->img_aux_03->filetype . ';base64,' . $moto->img_aux_03->base64;
			}

			if (isset($moto->img_aux_04)) {
				$moto->img_aux_04 = 'data:' . $moto->img_aux_04->filetype . ';base64,' . $moto->img_aux_04->base64;
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