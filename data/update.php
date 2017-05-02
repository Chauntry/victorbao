<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);


$json = $_POST['json'];

$info = file_put_contents('data.json', $json);


echo $info;

?>


