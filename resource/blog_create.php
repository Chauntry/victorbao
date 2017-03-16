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


$LmDate = $_POST["date"];
$Description = $_POST["description"];
$View = $_POST["view"];
$comments = $_POST["comments"];
$Pic = $_POST["Pic"];
$Article = $_POST["Article"];

// =========== Test code here !!!! =========

// $LmDate = 1486046972570;
// $Description = 'describe of blog 2';
// $View = 12;
// $comments = 100;
// $Pic = 'https://i.ytimg.com/vi/entAF9DWP5U/maxresdefault.jpg';
// $Article = "
//   <h1> My frist blog</h1>
//   <p> Artificial intelligence </p>
//   <p>Artificial intelligence (AI) is intelligence exhibited by machines. In computer science, the field";
// =========== Test code end here  =========


$sql_insert = "INSERT INTO Blogs (LmDate, Description,View,comments,Pic,Article)VALUES ('".$LmDate."','".$Description."',".$View.",".$comments.",'".$Pic."','".$Article."')";


$result = mysql_query($sql_insert);

$Array = array(
  'con' => $string,
  'result' => $result
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
