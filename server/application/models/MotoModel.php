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

    function buscarImagem($id, $imagem) {
        $sql = "select $imagem from moto where id = ?";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }

    function buscarSelecionadaNativo($id) {
        $sql = "select 
                m.id, 
                m.nome, 
                m.imagem as imagem, 
                m.id_revenda, 
                m.id_marca, 
                m.ano, 
                m.valor, 
                m.observacoes, 
                m.img_aux_01_thumb as img_aux_01, 
                m.img_aux_02_thumb as img_aux_02, 
                m.img_aux_03_thumb as img_aux_03, 
                m.img_aux_04_thumb as img_aux_04, 
                r.nome as revenda, 
                ma.nome as marca, 
                r.telefone as telefone,
                r.cidade, 
                r.bairro,
                r.endereco,
                r.email,
                r.site,
                r.imagem as revenda_imagem,
                r.facebook,
                r.id as revenda_id
                from moto m
                join revenda r on r.id = m.id_revenda
                join marca ma on m.id_marca = ma.id
                WHERE m.id = ?";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }

    function buscarSemelhantesNativo($id) {
        $sql = "select 
                    id,
                    nome,
                    imagem_home as imagem,
                    ano, 
                    valor,
                    valor_semelhante,
                    valor_semelhante and ano_semelhante as valor_ano_semelhante,
                    valor_semelhante and marca_semelhante as valor_marca_semelhante,
                    ano_semelhante,
                    marca_semelhante
                from 
                (
                    select 
                        m.id, 
                        m.nome, 
                        m.imagem_home, 
                        m.ano, 
                        m.valor,
                        m.ano >= (d.ano - 3) and m.ano <= (d.ano + 3) as ano_semelhante,
                        m.valor >= (d.valor - 2000) and m.valor <= (d.valor + 2000) as valor_semelhante,
                        m.id_marca = d.id_marca as marca_semelhante
                    from moto m,
                    (
                        select 
                            id,
                            nome,
                            id_marca,
                            ano,
                            valor
                        from moto
                        where id = ?
                    ) as d
                    where 
                    m.id <> d.id
                    and 
                    (   
                        m.id_marca = d.id_marca 
                        or
                        (m.ano >= (d.ano - 3) and m.ano <= (d.ano + 3))
                        or
                        (m.valor >= (d.valor - 2000) and m.valor <= (d.valor + 2000))
                        
                    )
                ) as todas_semelhantes
                order by
                valor_semelhante desc,
                valor_ano_semelhante desc,
                valor_marca_semelhante desc,
                ano_semelhante desc,
                marca_semelhante desc
                limit 5";

        $query = $this->db->query($sql, array($id));

        if ($query->num_rows() > 0) {
            return $query->result_array();
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
                m.id as id,
                m.nome as nome,
                m.imagem_home as imagem,
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