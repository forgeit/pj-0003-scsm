<?php

class MensagemModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'mensagem';
	}

    function buscarPorRevenda($revenda, $mensagem) {
        $sql = "select m.*, mt.nome as nome_moto, mt.ano from mensagem m
                join moto mt on mt.id = m.id_moto
                where m.id_revenda = ? and m.id = ?";

        $query = $this->db->query($sql, array($revenda, $mensagem));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
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

	function buscarTodosRevendaNativo($id, $tabela) {
        $sql = "select 
                msg.*, 
                date_format(msg.ts_recebido, '%d/%m/%y %H:%i:%s') as data_hora_recebido,
                case when msg.visualizado then 'Visualizado' else 'Não Visualizado' end as visualizado, 
                m.nome as nome_moto,
                m.ano as ano_moto
                from mensagem msg 
                join moto m on m.id = msg.id_moto
                where
                msg.id_revenda = ?
                order by " . $tabela->columns[$tabela->order[0]->column]->name . " " .  $tabela->order[0]->dir . 
                " limit ? offset ?";

        $query = $this->db->query($sql, array(
                $id, 
                $tabela->length, 
                $tabela->start));

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }

    function buscarTotalRevendaNativo($id) {
        $sql = "select 
                count(*) as total
                from mensagem msg 
                where
                msg.id_revenda = ?";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }
}