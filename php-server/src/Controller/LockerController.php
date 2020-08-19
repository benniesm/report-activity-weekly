<?php
namespace Src\Controller;

use Src\TableGateways\LockerGateway;

class LockerController {

    private $db;
    private $requestMethod;
    private $lockerId;

    private $lockerGateway;

    public function __construct($db, $requestMethod, $lockerId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->lockerId = $lockerId;

        $this->lockerGateway = new lockerGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->lockerId) {
                    $response = $this->getLocker($this->lockerId);
                } else {
                    $response = $this->getAllLockers();
                };
                break;
            case 'POST':
                $response = $this->createLockerFromRequest();
                break;
            case 'PUT':
                $response = $this->updateLockerFromRequest($this->lockerId);
                break;
            case 'DELETE':
                $response = $this->deleteLocker($this->lockerId);
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getAllLockers()
    {
        $result = $this->lockerGateway->findAll();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getLocker($id)
    {
        $result = $this->lockerGateway->find($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createLockerFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateLocker($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->lockerGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function updateLockerFromRequest($id)
    {
        $result = $this->lockerGateway->find($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateLocker($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->lockerGateway->update($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function deleteLocker($id)
    {
        $result = $this->lockerGateway->find($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $this->lockerGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateLocker($input)
    {
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
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}
