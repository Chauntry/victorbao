<?php

$host = localhost;
$root = 'root';
$pwd = 'Aa1020922136';

$con_info = '';
if(mysql_connect($host, $root, $pwd))
  $con_info = 'success';
else
  $con_info = 'fail';

$drop_info = '';
if (mysql_query("DROP DATABASE my_db",$con))
  $drop_info = 'success';
else
  $drop_info = 'fail' . mysql_error();

$database_info = '';
if (mysql_query("CREATE DATABASE my_db",$con))
  $database_info = 'success';
else
  $database_info = 'fail' . mysql_error();


mysql_select_db("my_db", $con);

$create_user = "CREATE TABLE user
(
Id int,
Username varchar(15),
Password varchar(15),
)";

$user_info = '';
if (mysql_query($create_user,$con))
  $user_info = 'success';
else
  $user_info = 'fail' . mysql_error();



mysql_close($con);


$tryArray = array(
  'con_info' => $con_info,
  'drop_info' => $drop_info,
  'database_info' => $database_info,
  'user_info' => $user_info,
);

$jsdata = json_encode($tryArray);

echo $jsdata;
?>
