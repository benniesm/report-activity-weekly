<?php
namespace Src\Controller;

use Src\TableGateways\UserGateway;

class Authenticator {

    private $db;

    private $userGateway;

    public function __construct($db)
    {
        $this->db = $db;
        $this->userGateway = new userGateway($db);
    }

    public function processCode()
    {
        return $this->authenticate();
    }

    private function authenticate()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $id = $input['user'];
        $code = $input['code'];
        $result = $this->userGateway->find($id);

        if (! $result) {
          return false;
        }

        if ($result[0]['auth_token'] !== $code) {
          return false;
        }

        return true;
    }
}
