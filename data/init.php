<?php
header('Access-Control-Allow-Origin: *');
$host = "http://www.victorbao.co.uk/data";

$json='
{
  "version": "1.1",
  "suggestion": [1,3,4],
  "recom": [
    {
      "id" : 1,
      "name" : "stud blablablablabla",
      "descr": "describe of stud ...",
      "photos" : [
        "'.$host.'/0_recom/1.jpg"
      ]
    },
    {
      "id" : 6,
      "name" : "glove blablablablabla",
      "descr": "describe of glove ...",
      "photos" : [
        "'.$host.'/0_recom/2.png"
      ]
    }
  ],
  "items": [
    {
      "id" : 1,
      "name" : "stud blablablablabla",
      "price" : "&pound;2 650.00",
      "photos" : [
        "'.$host.'/1_stud/1.jpg",
        "'.$host.'/1_stud/2.jpg",
        "'.$host.'/1_stud/3.jpg",
        "'.$host.'/1_stud/4.jpg",
        "'.$host.'/1_stud/5.jpg",
        "'.$host.'/1_stud/6.jpg",
        "'.$host.'/1_stud/7.jpg",
        "'.$host.'/1_stud/8.jpg",
        "'.$host.'/1_stud/9.jpg"
      ]
    },
    {
      "id" : 2,
      "name" : "spoon blablablablabla",
      "price" : "N/A",
      "photos" : [
        "'.$host.'/2_spoon/1.png",
        "'.$host.'/2_spoon/2.png",
        "'.$host.'/2_spoon/3.png",
        "'.$host.'/2_spoon/4.png",
        "'.$host.'/2_spoon/5.png",
        "'.$host.'/2_spoon/6.png"
      ]
    },
    {
      "id" : 3,
      "name" : "limit blablablablabla",
      "price" : "&pound;250.00",
      "photos" : [
        "'.$host.'/3_limit/1.png",
        "'.$host.'/3_limit/2.png",
        "'.$host.'/3_limit/3.png",
        "'.$host.'/3_limit/4.png"
      ]
    },
    {
      "id" : 4,
      "name" : "ring blablablablabla",
      "price" : "N/A",
      "photos" : [
        "'.$host.'/4_ring/1.png",
        "'.$host.'/4_ring/2.png",
        "'.$host.'/4_ring/3.png"
      ]
    },
    {
      "id" : 5,
      "name" : "vessle blablablablabla",
      "price" : "&pound;2 650.00",
      "photos" : [
        "'.$host.'/5_vessle/1.png",
        "'.$host.'/5_vessle/2.png",
        "'.$host.'/5_vessle/3.png"
      ]
    },
    {
      "id" : 6,
      "name" : "glove blablablablabla",
      "price" : "N/A",
      "photos" : [
        "'.$host.'/6_glove/1.png",
        "'.$host.'/6_glove/2.png",
        "'.$host.'/6_glove/3.png"
      ]
    }
  ]
}';

echo $json;
?>


