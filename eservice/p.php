<?
echo 'call p.php',time();
$r='';
require($r.'init.php');
$q['ff']=str_replace(".php.php",".php",$q['ff']);
if(file_exists($q['ff'])){
require($q['ff']);
}

pre($q);


?>