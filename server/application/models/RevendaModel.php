<?php

class RevendaModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'revenda';
	}

	function verificarLogin($login, $senha) {
		$sql = "SELECT 
				*
				FROM revenda
				WHERE login = ? AND senha = ?";

        $query = $this->db->query($sql, array($login, $senha));

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
	}
}