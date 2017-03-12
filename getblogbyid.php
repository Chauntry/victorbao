

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

$c_id=$_GET["id"]

// Create table in my_db database
mysql_select_db("my_db", $con);

$result = mysql_query("SELECT LmDate, Description,Pic,Article FROM Blogs WHERE c_Id = ".$c_id);

while ($row = mysql_fetch_array($result, MYSQL_BOTH)) {
   printf ("%s %s", $row[0], $row[1],$row[2],$row[3]);
}


// $Array = array(
//   'con' => $string,
//   'result' => $result
// );

// $jsdata = json_encode($Array);
// echo $jsdata;
?>
