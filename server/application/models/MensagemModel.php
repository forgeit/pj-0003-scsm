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

	function buscarTodosRevendaNativo($id) {
        $sql = "select 
                msg.*, 
                case when msg.visualizado then 'Visualizado' else 'Não Visualizado' end as visualizado, 
                m.nome as nome_moto,
                m.ano as ano_moto
                from mensagem msg 
                join moto m on m.id = msg.id_moto
                where
                msg.id_revenda = ?";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }
}