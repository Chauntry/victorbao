
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


$sql_getId = "select id from User where Username = '".$username."' and Password = '".$password."'";
$getId = mysql_query($sql_getId);

while ($row = mysql_fetch_array($getId, MYSQL_NUM)) {
  $id = $row[0];
}

// echo $id;
if ($id) {
  if ($id == 1)
    $user = 2;
  else
    $user = 1;
  setcookie("username", $username, time()+3600);
  setcookie("password", $password, time()+3600);
}
else {
  $user = 0;
}


$Array = array(
  'con' => $string,
  'result' => !!$id,
  'user' => $user,
  'id' => $id,
);

$jsdata = json_encode($Array);
echo $jsdata;
?>