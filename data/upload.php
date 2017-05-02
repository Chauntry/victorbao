<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

$file = $_FILES['file'];

$name = $file['name'];
$type = strtolower(substr($name,strrpos($name,'.')+1));
$allow_type = array('jpg','jpeg','gif','png');

if(!in_array($type, $allow_type)){
  return ;
}

if(!is_uploaded_file($file['tmp_name'])){
  return ;
}
$upload_path = "./";

if(move_uploaded_file($file['tmp_name'],$upload_path.$file['name'])){
  echo "Successfully!";
}else{
  echo "Failed!";
}

?>

