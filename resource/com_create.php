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

// Create table in my_db database
mysql_select_db("my_db", $con);


$Blog_id = $_GET["bid"];
$User_id = $_GET["uid"];
$LmDate = $_GET["LmDate"];
$Content = $_GET["content"];

$sql_insert = "INSERT INTO Comments (Blog_id, User_id,LmDate,Content)VALUES (".$Blog_id.",".$User_id.",'".$LmDate."','".$Content."')";



$result = mysql_query($sql_insert);

$Array = array(
  'con' => $string,
  'result' => $result
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
