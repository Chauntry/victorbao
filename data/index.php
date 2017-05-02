<?php
header('Access-Control-Allow-Origin: *');

$json = file_get_contents('data.json');
echo $json;

?>


