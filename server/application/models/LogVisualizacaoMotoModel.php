<?php

class LogVisualizacaoMotoModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'log_visualizacao_moto';
	}
}