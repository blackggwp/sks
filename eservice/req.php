<div style="width:500px; margin-top:20px; font-size:30px; background-color:#000; padding:10px; color:#F4C613;">
<?
require('conn.php');
$q=$_GET;

function icstr($s){
	return $s;
}
function checkpid($pid) {
   if(strlen($pid) != 13) return false;
      for($i=0, $sum=0; $i<12;$i++)
      $sum += (int)($pid{$i})*(13-$i);
      if((11-($sum%11))%10 == (int)($pid{12}))
      return true;
   return false;
}
function upnum($s){
 $n=(int)$s;
 return (string)($n+1);
}
function fill_digit($a,$b,$imax){
$r='';
$ilen=strlen($a.$b);
$idiff=$imax-$ilen;
for($i=0; $i < $idiff; $i++){
$r.='0';
}
return $a.$r.$b;
}

function runsql(PDO $conn, $sql) {
    $affected = $conn->exec($sql);
    if ($affected === false) {
        $err = $conn->errorInfo();
     print_r($err);
		return false;
    }
    return true;
}
function splitdate($d){
$a=explode("/", $d);
return $a[1].'/'.$a[0].'/'.$a[2];
}






$col=$q['field'];





foreach ($col as $k => $v){
}

if(   $col['empname']==''
    ||$col['emplastname']==''
	||$col['empperid']==''
	||$col['birthday']==''
	||$col['empstartdate']==''
){
 echo 'กรุณา กรอกข้อมูลให้ ครบ ';
 return;
}

$col['birthday']=splitdate($col['birthday']);
$col['empstartdate']=splitdate($col['empstartdate']);




$sql="select top 1 * from temployeereq where empperid='".$col['empperid']."'";
foreach ($conn->query($sql) as $r) 
{ 
	 echo 'มีรหัสพนักงานแล้ว กรุณาติดต่อแผนกบุคคลโดยตรง  เพื่อสร้างรหัสใหม่ ',icstr($r['empaname']),' ',icstr($r['emplastname']);
	 return;
}
if(!checkpid($col['empperid'])){
 echo 'รหัสประชาชน ผิด !!!!';
 return;
}


$re='';

if($col['emptypeid']=='01'){

	$query = "select top 1 * from trconfig";
	foreach ($conn->query($query) as $r) 
	{ 
	     $vx=upnum(trim($r['maxempid']));
		 $re=fill_digit(trim($r['empprefix']),$vx,6);
	}
}elseif($col['emptypeid']=='02') {
	$query = "select top 1 * from tconfig where k='empparttime' ";
	foreach ($conn->query($query) as $r) 
	{ 
	     $vx=upnum(trim($r['d']));
		 $re=fill_digit(trim($r['v']),$vx,6);
	}
}
$re=trim($re);

$col['empid']=$re;
$s="
INSERT temployeereq
           (empid
           ,empname
           ,emplastname
           ,empperid
           ,empprefix
           ,departid
           ,reqfromoutlet
           ,empstartdate
           ,birthday
           ,isreq
           ,reqsystemdate)
     VALUES
	 ('".$col['empid']."',
	  '".$col['empname']."',
	  '".$col['emplastname']."',
	  '".$col['empperid']."',
	  '".$col['empprefix']."',
	  '".$col['departid']."',
	  '".$col['reqfromoutlet']."',
	  '".$col['empstartdate']."',
	  '".$col['birthday']."',
	  '1',
	  getdate()
)
";




$ret_insert=runsql($conn,$s);
if(!$ret_insert){
 echo 'insert fail';
 exit;
}

$empid='';
$query = "SELECT empid FROM temployeereq WHERE (empid = '".$col['empid']."') and (empperid='".$col['empperid']."')";

foreach ($conn->query($query) as $r) 
{ 
	 $empid=$r['empid'];
}
if($col['empid']==$empid){
	if($col['emptypeid']=='01'){
		$query = "update trconfig set maxempid='".$vx."'";

	}elseif($col['emptypeid']=='02') {
		$query = "update tconfig set d='".$vx."' where k='empparttime' ";
	}
    $ret_insert=runsql($conn,$query);
	echo ' รหัสพนักงาน = ',$col['empid'];
}else {
 echo 'ทำรายการไม่สำเร็จ !!! ',$s;
}


?>
</div>
