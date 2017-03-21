<?
require_once('connectdb.php');
require_once('function.php');
date_default_timezone_set('UTC');
$today = date("Y-m-d");
$time = date("H:i:s");


$sqlcon = mysql_select_db("db");

$q=$_POST;

$refid=time();



$sql=" UPDATE tchecklisthead
		SET status='0',user_del='".$today."|".$time."|".$q['loginid']."'
		WHERE refid='".$q['refid']."';
	 ";
mysql_query($sql);



   


sleep(3);

?>