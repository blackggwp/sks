<?
require_once('connectdb.php');
require_once('function.php');
date_default_timezone_set('UTC');
$today = date("Y-m-d");
$time = date("H:i:s");


$sqlcon = mysql_select_db("db");

$q=$_POST;

$critical=$q['critical'];
$other=$q['other'];
$check=$q['check'];
$checkid=$q['checkid'];
$list=$q['list'];

 $refid=time();

$ntrue=0;
$nfalse=0;
foreach($check as $k=>$v ){	
	$sql=" insert into tchecklistpoint(refid,itemid,checkscore,txtother,topicid,update_refid) 
			values('".$refid."','".$k."','".$v."','".$other[$k]."','".$checkid[$k]."','".$q['rowhead']."') ;" ;
   mysql_query($sql);
   
   if($v=='true'){
      $ntrue=$ntrue+1;
    }else{
      $nfalse=$nfalse+1;
	}

}

$sql="insert into tchecklisthead(refid,outletid,empid,systemdate,systemtime,username,sumtrue,sumfalse,update_refid,status)
                  values('".$refid."','".$q['outletid']."','".$q['empid']."','".$today."','".$time."','".$q['username']."',
				  '".$ntrue."','".$nfalse."','".$q['rowhead']."','1') ";
   
   mysql_query($sql);

foreach($list as $k=>$v ){
	
	$sql=" insert into tchecklistlog(refid,topicid,score,outletid,empid,systemdate,critical,update_refid) values('".$refid."','".$k."','".$v."','".$q['outletid']."','".$q['empid']."','".$today."','".$critical[$k]."','".$q['rowhead']."') ;" ;
   mysql_query($sql);
   
}

sleep(3);

?>