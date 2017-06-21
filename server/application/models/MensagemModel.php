<?php

class MensagemModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'mensagem';
	}

	function buscarTotalNaoLidaPorRevendaNativo($revenda) {
        $sql = "select count(*) as total from mensagem
				where id_revenda = ? and visualizado = 0";

        $query = $this->db->query($sql, array($revenda));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
	}
}