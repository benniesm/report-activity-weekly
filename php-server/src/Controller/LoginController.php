<?php
namespace Src\Controller;

use Src\TableGateways\UserGateway;
use Src\TableGateways\LockerGateway;

class LoginController {

    private $db;
    private $requestMethod;
    private $loginId;

    private $loginGateway;

    public function __construct($db, $requestMethod, $loginId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->loginId = $loginId;

        $this->loginGateway = new userGateway($db);
        $this->lockerGateway = new lockerGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->validateCredentialsFromRequest();
                break;
            default:
                $response = $this->badRequestResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function validateCredentialsFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateLogin($input)) {
            return $this->unprocessableEntityResponse();
        }

        $result = $this->loginGateway->findLoginByEmail($input['email']);
        if (! $result) {
            return $this->notFoundResponse();
        }

        $result = $result[0];

        if (! password_verify($input['password'], $result['password'])) {
            return $this->invalidCredentialsResponse();
        }

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $rand_auth = '';

        for ($c = 0; $c < 51; $c++) {
          $rand_auth .= $characters[rand(0, strlen($characters)-1)];
        }

        $locked_timestamp = date("Y-m-d H:i:s");

        $locked = $this->lockerGateway->findByDate(date("Y-m-d"), $result['id']);
        if ($locked && $locked[0]['out_time'] === null) {
          $locked_timestamp = $locked[0]['in_time'];
        } else {
          $lock_data = array();
          $lock_data['user_id'] = $result['id'];
          $lock_data['token'] = $rand_auth;
          $lock_data['date'] = date("Y-m-d");
          $lock_data['lat'] = $input['lat'];
          $lock_data['lon'] = $input['lon'];
          $this->lockerGateway->insert($lock_data);
        }

        $result['auth_token'] = $rand_auth;
        $this->loginGateway->update($result['id'], $result);

        $result['password'] = null;
        $result['locked_in_time'] = $locked_timestamp;
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function validateLogin($input)
    {
        if (! isset($input['email'])) {
            return false;
        }
        if (! isset($input['password'])) {
            return false;
        }
        if (! isset($input['lat'])) {
            return false;
        }
        if (! isset($input['lon'])) {
            return false;
        }
        return true;
    }


    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = 'Missing login credentials';
        return $response;
    }

    private function invalidCredentialsResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = 'Invalid login credentials';
        return $response;
    }

    private function badRequestResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = 'Method not allowed';
        return $response;
    }
}
