<?php
namespace Src\Controller;

use Src\TableGateways\UserGateway;

class RegistrationController {

    private $db;
    private $requestMethod;
    private $registerId;

    private $registerGateway;

    public function __construct($db, $requestMethod, $registerId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->registerId = $registerId;

        $this->registerGateway = new userGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->createUserFromRequest();
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

    private function createUserFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateUser($input)) {
            return $this->unprocessableEntityResponse();
        }

        $result = $this->registerGateway->findByEmail($input['email']);
        if ($result) {
            return $this->oneFoundResponse();
        }

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $rand_device = '';

        for ($c = 0; $c < 21; $c++) {
          $rand_device .= $characters[rand(0, strlen($characters)-1)];
        }

        $input['device_token'] = $rand_device;
        $input['password'] = password_hash($input['password'], PASSWORD_DEFAULT);
        $this->registerGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = json_encode($input);
        return $response;
    }

    private function validateUser($input)
    {
        if (! isset($input['name'])) {
            return false;
        }
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
        $response['status_code_header'] = 'HTTP/1.1 404 Invalid Request';
        $response['body'] = null;
        return $response;
    }

    private function oneFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = json_encode([
            'error' => 'Email exists'
        ]);
        return $response;
    }

    private function badRequestResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = 'Method not allowed';
        return $response;
    }
}
