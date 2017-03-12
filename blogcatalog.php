

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

$result = mysql_query("SELECT LmDate, Description,View,comments,Pic FROM Blogs");


while ($row = mysql_fetch_array($result, MYSQL_BOTH)) {
   printf ("%s %s", $row[0], $row[1],$row[2],$row[3],$row[4]);
}


// $Array = array(
//   'con' => $string,
//   'result' => $result
// );

// $jsdata = json_encode($Array);
// echo $jsdata;
?>
