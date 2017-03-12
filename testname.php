
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

$sql_test = "select count(*) from User where username = '".$username."'";

$test = mysql_query($sql_test);

while ($row = mysql_fetch_array($test, MYSQL_NUM)) {
  $result = !$row[0];
}


$Array = array(
  'con' => $string,
  'result' => $result
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
