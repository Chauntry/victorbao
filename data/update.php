<?php
header('Access-Control-Allow-Origin: *');

$json = $_POST["json"];

file_put_contents('test.json', $json);

$success = "{success : 1}";
echo $json;
?>


