<?php

class MarcaModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'marca';
	}
}