<?php

class MensagemModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'mensagem';
	}
}