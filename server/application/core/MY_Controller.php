<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
	protected function criarRetorno($exec, $data, $msg = null) {
		return json_encode(array('exec' => $exec, 'data' => $data, 'msg' => $msg));
	} 
}