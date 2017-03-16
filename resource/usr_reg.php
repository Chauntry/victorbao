

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

$username=$_GET["name"];
$password=$_GET["pw"];

$sql_insert = "INSERT INTO User (Username, Password)VALUES ('".$username."','".$password."')";

$result = mysql_query($sql_insert);


$Array = array(
  'con' => $string,
  'result' => $result
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
