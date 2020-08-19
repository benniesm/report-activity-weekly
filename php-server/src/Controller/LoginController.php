<?php
namespace Src\Controller;

use Src\TableGateways\UserGateway;

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

        if (! password_verify($input['password'], $result[0]['password'])) {
            return $this->invalidCredentialsResponse();
        }

        $result[0]['password'] = null;
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
