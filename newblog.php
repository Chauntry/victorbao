

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

// $username=$_GET["name"];
// $password=$_GET["pw"];


// =========== Test code here !!!! =========

$LmDate = 1486046972570;
$Description = 'describe of blog 2';
$View = 12;
$comments = 100;
$Pic = 'https://i.ytimg.com/vi/entAF9DWP5U/maxresdefault.jpg';
$Article = "
  <h1> My frist blog</h1>
  <p> Artificial intelligence </p>
  <p>Artificial intelligence (AI) is intelligence exhibited by machines. In computer science, the field of AI research defines itself as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of success at some goal.[1] Colloquially, the term "artificial intelligence" is applied when a machine mimics "cognitive" functions that humans associate with other human minds, such as "learning" and "problem solving" (known as Machine Learning).[2] As machines become increasingly capable, mental facilities once thought to require intelligence are removed from the definition. For example, optical character recognition is no longer perceived as an exemplar of "artificial intelligence", having become a routine technology.[3] Capabilities currently classified as AI include successfully understanding human speech,[4] competing at a high level in strategic game systems (such as Chess and Go[5]), self-driving cars, intelligent routing in content delivery networks, and interpreting complex data.

  AI research is divided into subfields[6] that focus on specific problems or on specific approaches or on the use of a particular tool or towards satisfying particular applications.

  The central problems (or goals) of AI research include reasoning, knowledge, planning, learning, natural language processing (communication), perception and the ability to move and manipulate objects.[7] General intelligence is among the field's long-term goals.[8] Approaches include statistical methods, computational intelligence, and traditional symbolic AI. Many tools are used in AI, including versions of search and mathematical optimization, logic, methods based on probability and economics. The AI field draws upon computer science, mathematics, psychology, linguistics, philosophy, neuroscience and artificial psychology.

  The field was founded on the claim that human intelligence "can be so precisely described that a machine can be made to simulate it".[9] This raises philosophical arguments about the nature of the mind and the ethics of creating artificial beings endowed with human-like intelligence, issues which have been explored by myth, fiction and philosophy since antiquity.[10] Some people also consider AI a danger to humanity if it progresses unabatedly.[11] Attempts to create artificial intelligence have experienced many setbacks, including the ALPAC report of 1966, the abandonment of perceptrons in 1970, the Lighthill Report of 1973, the second AI winter 1987–1993 and the collapse of the Lisp machine market in 1987.

  In the twenty-first century, AI techniques, both "hard" and "soft" have experienced a resurgence following concurrent advances in computer power, sizes of training sets, and theoretical understanding, and AI techniques have become an essential part of the technology industry, helping to solve many challenging problems in computer science.[12]
  </p>
  "
// =========== Test code end here  =========


$sql_insert = "INSERT INTO Blogs (LmDate, Description,View,comments,Pic,Article)VALUES ('".$LmDate."','".$Description."','".$View."','".$comments."','".$Pic."','".$Article."')";

$result = mysql_query($sql_insert);
$result = mysql_query($sql_insert);
$result = mysql_query($sql_insert);

$Array = array(
  'con' => $string,
  'result' => $result
);

$jsdata = json_encode($Array);
echo $jsdata;
?>
