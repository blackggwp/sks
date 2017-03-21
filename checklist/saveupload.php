<?
require_once('connectdb.php');
require_once('function.php');
date_default_timezone_set('UTC');
$today = date("Y-m-d");

$sqlcon = mysql_select_db("db");

$q=$_POST;

$sql=" insert into tchecklistpic(Id,systemdate,outletid,empid,picname,comment) values('".$q['picid']."','".$today."','".$q['outletid']."','".$q['empid']."','".$q['picname']."','".$q['comment']."') ;" ;
mysql_query($sql);
//echo date("l");

sleep(3);

?>