<?php
namespace Src\Controller;

use Src\TableGateways\WorkdoneGateway;

class WorkdoneController {

    private $db;
    private $requestMethod;
    private $workdoneId;

    private $workdoneGateway;

    public function __construct($db, $requestMethod, $workdoneId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->workdoneId = $workdoneId;

        $this->workdoneGateway = new workdoneGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->workdoneId) {
                    $response = $this->getWorkdone($this->workdoneId);
                } else {
                    $response = $this->getAllWorkdone();
                };
                break;
            case 'POST':
                $response = $this->createWorkdoneFromRequest();
                break;
            case 'PUT':
                $response = $this->updateWorkdoneFromRequest($this->workdoneId);
                break;
            case 'DELETE':
                $response = $this->deleteWorkdone($this->workdoneId);
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

    private function getAllWorkdone()
    {
        $result = $this->workdoneGateway->findAll();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getWorkdone($id)
    {
        $result = $this->workdoneGateway->find($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createWorkdoneFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateWorkdone($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->workdoneGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function updateWorkdoneFromRequest($id)
    {
        $result = $this->workdoneGateway->find($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateWorkdone($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->workdoneGateway->update($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function deleteWorkdone($id)
    {
        $result = $this->workdoneGateway->find($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $this->workdoneGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateWorkdone($input)
    {
        if (! isset($input['lock_id'])) {
            return false;
        }
        if (! isset($input['activity'])) {
            return false;
        }
        if (! isset($input['achievement'])) {
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
