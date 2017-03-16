

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

$Array=array();

$i=0;
while($row=mysql_fetch_array($result,MYSQL_ASSOC)){
  $Array[$i]=$row;
  $i++;
}

$jsdata = json_encode($Array);
echo $jsdata;
?>