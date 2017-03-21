<?
$init=true;
require('config.php');
require('function.php');

$q=q();

$i=$q['sys'];
if($i['fid']==''){
$i['fid']=$i['login_id'];
$q['sys']['fid']=$i['login_id'];
}

$col=$q['field'];
$ppr=$q['ppr'];
$hurl=$i['hurl'];
$h=$q['h'];


$hx = explode("?", $hurl);
$hroot=str_replace("#/","",$hx[0]);
$q['ff']=$hroot.'/'.$h['p'].'.php';



?>