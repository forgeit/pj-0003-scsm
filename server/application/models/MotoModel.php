<?php

class MotoModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'moto';
	}

	function buscarTodosNativo($id = null) {
		$sql = "select 
                m.nome as nome,
                m.imagem as imagem,
                r.nome as revenda,
                ma.nome as marca,
                m.ano,
                m.valor,
                m.observacoes
                from moto m
                join marca ma on ma.id = m.id_marca
                join revenda r on r.id = m.id_revenda";

        $query = $this->db->query($sql);

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
	}

}