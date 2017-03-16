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

$result = mysql_query("SELECT LmDate, Description,Pic,Article FROM Blogs WHERE Id = ".$id);

while ($row = mysql_fetch_array($result, MYSQL_BOTH)) {
  $LmDate = $row[0];
  $Description = $row[1];
  $Pic = $row[2];
  $Article = $row[3];
}


$Array = array(
  'con' => $string,
  'result' => $result,
  'date' => $LmDate,
  'description'=>$Description,
  'pic' => $Pic,
  'article' => $Article
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
