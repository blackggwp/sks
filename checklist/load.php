<link href='https://fonts.googleapis.com/css?family=Montserrat:700' rel='stylesheet' type='text/css'>
<div class="font-Montserrat">
	<div class="H-menuA"><div class="Br"></div>/ Assessment</div>
</div class="font-Montserrat">

<div style="text-align:left">
<div class="top-header" style="display:none"> Back 
   <div>xxxxxxxxxx</div>
</div>
<? 
require_once('connectdb.php');
require_once('function.php');


$t=" select * from checklist 

order by checklist.rowid ";


$t="

select checklist.*,tdepart.departname,tgroup.groupname,titem.itemid,titem.itemname,titem.other,titem.unscore  from checklist 
left JOIN titem ON  (checklist.topicid = titem.topicid)
left JOIN tdepart ON  (checklist.departid = tdepart.departid)
left JOIN tgroup ON  (checklist.groupid = tgroup.groupid)

order by topicid,itemid,itemname


";



$sql=$t;
$objDB = mysql_select_db("db");
$objQuery = mysql_query($sql) or die (mysql_error());

$dt=array();

$ttopic=array();

$depart=array();
$group=array();

while($dr=mysql_fetch_array($objQuery)){
	    array_push($depart,$dr['departid'].'.'.$dr['departname']);
	    array_push($group,$dr['groupid']);
		$ttopic[$dr['topicid']]=$dr;
$dt[]=$dr;		
}


function getgroup($dt,$depart){
$a=array();
foreach($dt as $dr){
  if($dr['departid']==$depart){
    array_push($a,$dr['groupid'].'.'.$dr['groupname']);
  }
}
return array_unique($a);
}

function getdepart($dt,$depart,$group){
$a=array();
foreach($dt as $dr){
  if($dr['departid']==$depart && $dr['groupid']==$group){
    array_push($a,$dr['topicid'].'.'.$dr['topicname']);
  }
}
return array_unique($a);
}

function getgroup3($dt,$depart,$group,$topic){
	 $ax=explode(".", $topic);
	$topic=$ax[0];
	
$a=array();
foreach($dt as $dr){
  if($dr['departid']==$depart && $dr['groupid']==$group && $dr['topicid']==$topic){
	 if($dr['itemid'] != ''){
       array_push($a,$dr['itemid'].'.'.$dr['other'].'.'.$dr['unscore'].'.'.$dr['itemname']);
	 } 
  }
}
return array_unique($a);
}


$depart=array_unique($depart);
$group=array_unique($group);

$s1='';
$s2='';

$a1=array();
$a2=array();

$other .= '<input class="other" type="text" name="orther" value="">';

foreach($depart as $s){
	
	
 $a1=explode(".", $s);
 $s=$a1[0];
 
 
 $s1.='<div class="bgload">
 <div class="gdepart">'.$a1[1].'  
 <img src="img/arrows.png" width="20" height="20" style="float:right"  id="showlist"/>
 </div><div>@'.$s.'@</div></div>';
   $r1=getgroup($dt,$s);
   $sx='';
      
   foreach($r1 as $s2){
	   
	   $a2=explode(".", $s2);
			$s2=$a2[0];
			
	    $r2=getdepart($dt,$s,$s2);
		   $sy='';
		   foreach($r2 as $s3){
			    $ax=explode(".", $s3);
			    $topicid=$ax[0];
                $topicname=str_replace($topicid.'.',"",$s3);
			   
			    $drx=$ttopic[$topicid];
			   
			    $r3=getgroup3($dt,$s,$s2,$s3);
				    $sz='';
					
			     	foreach($r3 as $s4){
					//pre ($s4);	
	                   $a3=explode(".", $s4);
					   $itemid=$a3[0];
					   $otherid=$a3[1];
					   $itemunscore=$a3[2];
					   $itemname=$a3[3];
					   
					   if ($a3[1] == 1) {
						  $itemother = $other;
					   }
					   else{$itemother = ''; }
					   
					$a4=explode(".", $s3);	
					   
								
					   
                       $sz.='
						   <div class="gitem">
						   	<div id="boxcheck">
							    <div class="divother" data-itemid="'.$itemid.'">'.$itemother.'</div>
								<input class="addbox" data-itemid="'.$itemid.'" data-topicid="'.$drx['topicid'].'" type="checkbox" 
								name="item" value="'.$itemunscore.'" onClick="" checked>
							</div>
							<div style="margin-top:0px;">'.$itemname.'</div>
						   </div>
					   ';
					}
					
			  
			   
			 			   
			   $soption=$drx['rate'];
			   
			   		
			   /*for($k=0; $k<=$drx['rate']; $k++){
				   if($k=='0'){
				  $soption.='<option value="" >-Select-</option>';
				   }else{
				  $soption.='<option value="'.$k.'">'.$k.'</option>';
				   }
				}*/
			   
			   $sy.='<div>
			    <div class="gtopic">
					<div class="text-topic">'.$drx['topicname'].'<a class="a-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</a><div style="height:19px"></div></div>
				</div>
				<div class="divscore" style="right:45; margin-top:-39px">
					<select class="critical" data-topicid="'.$drx['topicid'].'">
					  <option value="99">C</option>
					  <option value="0">High</option>
					  <option value="1">Normal</option>
					  <option value="2">Low</option>
					</select>
				</div>
			    <div class="divscore">
					<input class="scoretopic" data-topicid="'.$topicid.'" type="text" data-val="'.$soption.'"  value="'.$soption.'" readonly/>
				</div>
			    <div class="gitembox">'.$sz.'</div>
			   </div>';
		   }
         $sx.='<div class="ggroupbox"><div class="ggroup"  style="padding-left:10px;" >'.$a2[1].'</div><div>'.$sy.'</div></div>';
   }
   $s1=str_replace("@".$s."@",$sx,$s1);
 }


echo $s1; 




/*
$j=0;

$s1='';

$a1=array();


function getgroup($dt,$depart){
$a=array();
foreach($dt as $dr){
  if($dr['departid']==$depart){
    array_push($a,$dr['groupid']);
  }
}
return array_unique($a);
}



// get depart 
foreach($dt as $dr){
  if($depart!=$dr['departid']){
    if($depart==''){
	   $s1.='<div>'.$dr['departid'].'<div>@'.$dr['departid'].'@</div>';
	}else {
	   $s1.='</div><div>'.$dr['departid'].'<div>@'.$dr['departid'].'@</div>';
	}
	$a1[]=$dr['departid'];
  }	
  $depart=$dr['departid'];
}


// get group 
$s2='';

*/

?>

</div style="text-align:left">
<div style="margin-top:px; background-color:#F3F3F3;">
<br>
<br>
<div>
	<div>สาขา</div>
    <input  type="text" class="textbox" id="outletid" readonly/>
</div>
<br>
<div>
	<div>พนักงานทำรายการ</div>
    <input  type="text" class="textbox" id="empid" readonly/>
</div>
<br>
<div>
	<?     
        $date = date("j F, Y");
        $time = date("H:i:s");
        //echo $date." / ".$time;
    ?>
	<div>วันที่</div>
    <input type="text" class="textbox" id="datelist" value="<? echo $date; ?>" readonly/> 
</div>
<br>
<div id="headid">
	<div>แก้ไขรายการที่</div>
    <input  type="text" class="textbox" value="" id="rowhead"/>
</div>

</div>

 <div class="showtxt" style="height:px; overflow:auto;"></div>
     
 

<div style="height:30%; background-color:#F3F3F3;"></div>

<div class="bpanel" >
	<div id="bsubmit">
     <input style="width:100px; height:35px; margin-top:5px; border-radius:3px; font-size:24px; font-family:Montserrat; cursor:pointer;" type="submit" value="Save">
	</div>
<div><a href="#aa" id="back-to-top" title="Back to top">&uarr;</a></div>


</div>

			   


