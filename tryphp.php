
<?php

$host = localhost;
$root = 'root';
$pwd = 'Aa1020922136';

$string = '';
$con = mysql_connect($host, $root, $pwd);
if($con == false) {
  $string = 'fail';
} else {
  $string = 'success';
}



$tryArray = array(
  'connecting' => $string,
  'text' => 'json code',
);
$jsdata = json_encode($tryArray);
echo $jsdata;

?>
