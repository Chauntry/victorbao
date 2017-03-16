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

if (mysql_query("DROP DATABASE my_db",$con))
{
  echo "Database droped";
}
else
{
  echo "Error droping database: " . mysql_error();
}

echo'</br>';

if (mysql_query("CREATE DATABASE my_db",$con))
{
  echo "Database created";
}
else
{
  echo "Error creating database: " . mysql_error();
}
echo'</br>';

// Create table in my_db database
mysql_select_db("my_db", $con);

$creatUser = "CREATE TABLE User
(
Id int(5) NOT NULL auto_increment,
Username varchar(15) UNIQUE,
Password varchar(15),
PRIMARY KEY  (`id`)
)";


$creatBlogs = "CREATE TABLE Blogs
(
Id int(5) NOT NULL auto_increment,
LmDate varchar(15),
Description varchar(50),
View int(8),
Pic varchar(200),
comments int(5),
Article blob,
PRIMARY KEY  (`id`)
)";

$creatComments = "CREATE TABLE Comments
(
c_id int(5) NOT NULL auto_increment,
Blog_id int(5) NOT NULL,
User_id int(5) NOT NULL,
LmDate varchar(15),
Content varchar(200),
PRIMARY KEY  (`c_id`)
)";

mysql_query($creatUser,$con);
mysql_query($creatBlogs,$con);
mysql_query($creatComments,$con);
mysql_query("INSERT INTO User (Username, Password)
VALUES ('Admin','admin')");

?>
