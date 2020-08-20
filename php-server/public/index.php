<?php
require "../bootstrap.php";
use Src\Controller\Authenticator;
use Src\Controller\LoginController;
use Src\Controller\LockerController;
use Src\Controller\RegistrationController;
use Src\Controller\UserController;
use Src\Controller\WorkdoneController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// all of our endpoints start with /user
// everything else results in a 404 Not Found
if ($uri[1] !== 'user'
  && $uri[1] !== 'locker'
  && $uri[1] !== 'workdone'
  && $uri[1] !== 'login'
  && $uri[1] !== 'register') {
    header("HTTP/1.1 404 Not Found");
    exit('The link does not exist!');
}

// the user id is, of course, optional and must be a number:
$requestId = null;
if (isset($uri[2])) {
    $requestId = (int) $uri[2];
}

// authenticate the request
$authenticator = new Authenticator($dbConnection);
$access_granted = $authenticator->processCode();
if (! $access_granted) {
    header("HTTP/1.1 401 Unauthorized");
    exit('Unauthorized');
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// pass the request method and user ID to the UserController and process the HTTP request:
switch ($uri[1]) {
  case 'user':
    $controller = new UserController($dbConnection, $requestMethod, $requestId);
    break;
  case 'locker':
    $controller = new LockerController($dbConnection, $requestMethod, $requestId);
    break;
  case 'workdone':
    $controller = new WorkdoneController($dbConnection, $requestMethod, $requestId);
    break;
  case 'login':
    $controller = new LoginController($dbConnection, $requestMethod, $requestId);
    break;
  case 'register':
    $controller = new RegistrationController($dbConnection, $requestMethod, $requestId);
    break;
  default:
    $controller = new DefaultController($dbConnection, $requestMethod, $requestId);
}

$controller->processRequest();
