<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Revenda extends MY_Controller {

	public function buscar() {
		$retorno = $this->RevendaModel->buscarPorId($this->revendaAtual);
		$retorno['imagem'] = $this->convertStringToFileObject($retorno['imagem']);
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

	public function atualizar() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$revenda = json_decode($data);

		$formularioValido = false;

		$formularioValido = isset($revenda->nome) && strlen(trim($revenda->nome)) > 0;
		$formularioValido = isset($revenda->email) && strlen(trim($revenda->email)) > 0 && $formularioValido;

		if ($formularioValido) {
			if (!$this->validarTipoImagem($revenda->imagem)) {
				print_r($this->criarRetorno(false, null, 'Logo inválido'));
			}

			$revenda->imagem = 'data:' . $revenda->imagem->filetype . ';base64,' . $revenda->imagem->base64;

			$retorno = $this->RevendaModel->atualizar($this->revendaAtual, $revenda);

			if ($retorno) {
				print_r($this->criarRetorno(true, null, 'Sucesso ao atualizar.'));
			} else {
				print_r($this->criarRetorno(false, null, 'Erro ao atualizar.'));
			}
		} else {
			print_r($this->criarRetorno(false, null, 'Verifique se os dados obrigatórios foram informados.'));
		}
	}

	public function buscarTodos() {
		$retorno = $this->RevendaModel->buscarTodos('nome');
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));

	}

	public function listar() {
		$retorno = $this->RevendaModel->buscarTodos('nome');
		$exec = count($retorno) > 0;
		print_r($this->criarRetorno($exec, $retorno));		
	}

	private function validarTipoImagem($imagem) {
		if ($imagem) {
			return $imagem->filetype === 'image/jpeg' || $imagem->filetype === 'image/jpg' || $imagem->filetype === 'image/png';
		} else {
			return true;
		}
	}

}