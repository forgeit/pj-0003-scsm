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
        if (isset($filtros->anoInicial) ||
            isset($filtros->anoFinal) ||
            isset($filtros->marca) || 
            isset($filtros->revenda) ||
            isset($filtros->valorMin) ||
            isset($filtros->valorMax) || 
            isset($filtros->query) ||
            isset($filtros->paginacao)
            ) {
            $sql = "select 
                    m.id as id,
                    m.nome as nome,
                    m.imagem_home as imagem,
                    m.ano,
                    m.valor
                    from moto m
                    join marca ma on ma.id = m.id_marca
                    join revenda r on r.id = m.id_revenda ";

            $sql .= " WHERE ";
            $sql .= " m.data_venda is NULL ";

            $params = array();

            if (isset($filtros->anoInicial) && isset($filtros->anoFinal)) {
                $sql .= " AND m.ano >= ? AND m.ano <= ? ";
                $params[] = $filtros->anoInicial;
                $params[] = $filtros->anoFinal;
            } else if (isset($filtros->anoInicial)) {
                $sql .= " AND m.ano >= ? ";
                $params[] = $filtros->anoInicial;
            } else if (isset($filtros->anoFinal)) {
                $sql .= " AND m.ano <= ? ";
                $params[] = $filtros->anoFinal;
            }

            if (isset($filtros->marca)) {
                $sql .= " AND m.id_marca = ? ";
                $params[] = $filtros->marca;
            }

            if (isset($filtros->revenda)) {
                $sql .= " AND m.id_revenda = ? ";
                $params[] = $filtros->revenda;
            }

            if (isset($filtros->valorMin) && isset($filtros->valorMax)) {
                $sql .= " AND m.valor >= ? AND m.valor <= ? ";
                $params[] = $filtros->valorMin;
                $params[] = $filtros->valorMax;
            } else if (isset($filtros->valorMin)) {
                $sql .= " AND m.valor >= ? ";
                $params[] = $filtros->valorMin;
            } else if (isset($filtros->valorMax)) {
                $sql .= " AND m.valor <= ? ";
                $params[] = $filtros->valorMax;
            }

            if (isset($filtros->query)) {
                $arrayParametros = explode(" ", $filtros->query);

                foreach ($arrayParametros as $key => $value) {
                    $sql .= " OR (
                                lower(ma.nome) like '%" . $value . "%'
                                or 
                                lower(m.nome) like '%" . $value . "%'
                                or 
                                lower(r.nome) like '%" . $value . "%'
                                or 
                                CONVERT(m.ano, CHAR(50)) like '%" . $value . "%'
                            )";
                }
            }

            $sql .= " ORDER BY m.id DESC LIMIT 12";

            if (isset($filtros->paginacao)) {
                $sql .= " OFFSET ? ";

                $params[] = $filtros->paginacao->pagina * 3;
            }

            $query = $this->db->query($sql, $params);
        } else {
            $sql = "select 
                        m.id,
                        m.nome,
                        m.valor,
                        m.imagem_home as imagem,
                        m.ano,
                        coalesce(r.id_revenda, 10000) as id_revenda
                    from moto m 
                    left join (
                    select 
                        m.id_revenda,
                        max(m.id) as id_moto
                    from moto m 
                    group by m.id_revenda
                    ) r on r.id_moto = m.id
                    where data_venda is null
                    order by id_revenda 
                    limit 12";        

            $query = $this->db->query($sql);
        }

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
	}

    function buscarTotalizadoresPorRevenda($revenda) {
        $sql = "select 
                    coalesce(sum(va.valor_venda - (va.valor_custos_compra_moto + va.valor_custos_mecanica + va.valor_custos_documentos + va.valor_custos_diversos)), 0) as lucro_anual,
                    coalesce(sum(vm.valor_venda - (vm.valor_custos_compra_moto + vm.valor_custos_mecanica + vm.valor_custos_documentos + vm.valor_custos_diversos)), 0) as lucro_mensal,
                    coalesce(sum(vs.valor_venda - (vs.valor_custos_compra_moto + vs.valor_custos_mecanica + vs.valor_custos_documentos + vs.valor_custos_diversos)), 0) as lucro_semanal,
                    coalesce(sum((va.valor_custos_compra_moto + va.valor_custos_mecanica + va.valor_custos_documentos + va.valor_custos_diversos)), 0) as custo_anual,
                    coalesce(sum((vm.valor_custos_compra_moto + vm.valor_custos_mecanica + vm.valor_custos_documentos + vm.valor_custos_diversos)), 0) as custo_mensal,
                    coalesce(sum((vs.valor_custos_compra_moto + vs.valor_custos_mecanica + vs.valor_custos_documentos + vs.valor_custos_diversos)), 0) as custo_semanal,
                    coalesce(sum(va.valor_venda), 0) as entrada_anual,
                    coalesce(sum(vm.valor_venda), 0) as entrada_mensal,
                    coalesce(sum(vs.valor_venda), 0) as entrada_semanal
                from moto m
                left join 
                (
                    select
                    m.id,
                    coalesce(valor_venda, 0) as valor_venda,
                    coalesce(valor_custos_mecanica, 0) as valor_custos_mecanica,
                    coalesce(valor_custos_compra_moto, 0) as valor_custos_compra_moto,
                    coalesce(valor_custos_documentos, 0) as valor_custos_documentos,
                    coalesce(valor_custos_diversos, 0) as valor_custos_diversos
                    from moto m
                    where 
                    data_venda between ? and ?
                    and id_revenda = ?
                ) as va on va.id = m.id
                left join 
                (
                    select
                    m.id,
                    coalesce(valor_venda, 0) as valor_venda,
                    coalesce(valor_custos_mecanica, 0) as valor_custos_mecanica,
                    coalesce(valor_custos_compra_moto, 0) as valor_custos_compra_moto,
                    coalesce(valor_custos_documentos, 0) as valor_custos_documentos,
                    coalesce(valor_custos_diversos, 0) as valor_custos_diversos
                    from moto m
                    where 
                    data_venda between ? and ?
                    and id_revenda = ?
                ) as vm on vm.id = m.id
                left join 
                (
                    select
                    m.id,
                    coalesce(valor_venda, 0) as valor_venda,
                    coalesce(valor_custos_mecanica, 0) as valor_custos_mecanica,
                    coalesce(valor_custos_compra_moto, 0) as valor_custos_compra_moto,
                    coalesce(valor_custos_documentos, 0) as valor_custos_documentos,
                    coalesce(valor_custos_diversos, 0) as valor_custos_diversos
                    from moto m
                    where 
                    data_venda between ? and ?
                    and id_revenda = ?
                ) as vs on vs.id = m.id
                where m.id_revenda = ?";

        $ano = date('Y');
        $mes = date('m');
        $hoje = date('Y-m-d');
        $daquiUmaSemana = date('Y-m-d', strtotime($hoje . ' + 7 days'));
        $ultimoDiaMes = cal_days_in_month(CAL_GREGORIAN, $mes, $ano);

        $parametros = array(
            $ano . '-01-01' ,
            $ano . '-12-31' ,
            $revenda,
            $ano . '-' . $mes . '-01',
            $ano . '-' . $mes . '-' . $ultimoDiaMes,
            $revenda,
            $hoje,
            $daquiUmaSemana,
            $revenda,
            $revenda
        );

        $query = $this->db->query($sql, $parametros);

        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return null;
        }
    }

}