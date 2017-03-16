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

$id=$_GET["id"];

// Create table in my_db database
mysql_select_db("my_db", $con);

$result = mysql_query("SELECT User_id,LmDate,Content FROM Comments WHERE Blog_id = ".$id);


while ($row = mysql_fetch_array($result, MYSQL_BOTH)) {
  $User_id = $row[0];
  $LmDate = $row[1];
  $Content = $row[2];
}


$Array = array(
  'con' => $string,
  'result' => !!$User_id,
  'User_id' => $User_id,
  'LmDate'=>$LmDate,
  'Content' => $Content,
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
