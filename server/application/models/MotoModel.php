<?php

class MotoModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'moto';
	}

    function buscarRevendaNativo($id) {
        $sql = "select 
                *
                from moto m
                WHERE m.id = ?";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }

    function buscarTodosRevendaNativo($id) {
        $sql = "select 
                m.id as id,
                m.nome as nome,
                m.imagem as imagem,
                r.nome as revenda,
                ma.nome as marca,
                m.ano,
                m.valor,
                m.observacoes
                from moto m
                join marca ma on ma.id = m.id_marca
                join revenda r on r.id = m.id_revenda where r.id = ?";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
    }

	function buscarTodosNativo($filtros) {
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
                join revenda r on r.id = m.id_revenda ";

        if (isset($filtros->anoInicial) ||
            isset($filtros->anoFinal) ||
            isset($filtros->marca) || 
            isset($filtros->revenda) ||
            isset($filtros->valorMin) ||
            isset($filtros->valorMax)
            ) {

            $sql .= " WHERE ";
            $params = array();

            if (isset($filtros->anoInicial) && isset($filtros->anoFinal)) {
                $sql .= " m.ano >= ? AND m.ano <= ? ";
                $params[] = $filtros->anoInicial;
                $params[] = $filtros->anoFinal;
            } else if (isset($filtros->anoInicial)) {
                $sql .= " m.ano >= ? ";
                $params[] = $filtros->anoInicial;
            } else if (isset($filtros->anoFinal)) {
                $sql .= " m.ano <= ? ";
                $params[] = $filtros->anoFinal;
            }

            if (isset($filtros->marca)) {
                if (count($params) > 0) {
                    $sql .= " AND ";
                }

                $sql .= " m.id_marca = ? ";
                $params[] = $filtros->marca;
            }

            if (isset($filtros->revenda)) {
                if (count($params) > 0) {
                    $sql .= " AND ";
                }

                $sql .= " m.id_revenda = ? ";
                $params[] = $filtros->revenda;
            }

            if (isset($filtros->valorMin) && isset($filtros->valorMax)) {
                if (count($params) > 0) {
                    $sql .= " AND ";
                }

                $sql .= " m.valor >= ? AND m.valor <= ? ";
                $params[] = $filtros->valorMin;
                $params[] = $filtros->valorMax;
            } else if (isset($filtros->valorMin)) {
                if (count($params) > 0) {
                    $sql .= " AND ";
                }

                $sql .= " m.valor >= ? ";
                $params[] = $filtros->valorMin;
            } else if (isset($filtros->valorMax)) {
                if (count($params) > 0) {
                    $sql .= " AND ";
                }

                $sql .= " m.valor <= ? ";
                $params[] = $filtros->valorMax;
            }

            $query = $this->db->query($sql, $params);
        } else {
            $query = $this->db->query($sql);
        }

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
	}

}