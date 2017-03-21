<div class="clear">
<?
	require_once('connectdb.php');
	require_once('function.php');
	
	$q=$_POST;
	//pre($q);
?>	
	<script src="js/tableToExcel.js"></script>
	<div style="font-family: CSPraJad-bold;">
<?
	require_once('connectdb.php');

	$t=" SELECT checklist.topicid,topicname,rate,.titem.itemid,itemname,unscore,tchecklistlog.refid,score,critical,checkscore,txtother 
			FROM tchecklistpoint
		    INNER JOIN tchecklistlog ON tchecklistpoint.refid=tchecklistlog.refid AND tchecklistpoint.topicid=tchecklistlog.topicid
		    LEFT JOIN titem ON tchecklistpoint.itemid=titem.itemid
		    LEFT JOIN checklist ON titem.topicid=checklist.topicid
		    WHERE tchecklistpoint.refid='".$q[rowid]."' AND checkscore like 'false'
		    ORDER BY critical,checklist.topicid,tchecklistpoint.itemid
	;";
	//echo $t;
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
	
?>
<div class="Idhead"><? echo $q[row];?></div>

<table class="head" border="0" width="100%">
	<tr>
    	<th style="width:80%" class="">ห้วข้อ</th>
        <th style="width:10%" class="">เต็ม</th>
		<th style="width:10%" class="">เหลือ</th>
    </tr>
</table>   
<div class="r_scroll">
<table class="head" id="head1" border="0" width="100%">
	<tr style="font-size:;">
		<th style="display:none;">ห้วข้อหลัก</th>
        <th style="display:none;">ห้วข้อย่อย</th>
		<th style="display:none;">คะแนนเต็ม</th>
        <th style="display:none;">คะแนนที่หัก</th>
        <th style="display:none;">เหลือ</th>
    </tr>    
<?	
	$topic=array();
	$score=array();
	
	while($dr=mysql_fetch_array($objQuery)){
?>

    <tr>
        <td style="display:none;"><? echo $dr['topicname'];?></td>
        <td style="display:none;"><? echo $dr['itemname'];?></td>
        <td style="display:none;"><? echo $dr['rate']; ?></td>
        <td style="display:none;"><? echo $dr['unscore']; ?></td>
        <td style="display:none;"><? echo $dr['score']; ?></td>        
    </tr>
<?	
	array_push($score,$dr['topicid'].'|'.$dr['unscore'].'|'.$dr['itemname'].'|'.$dr['txtother']);
	array_push($topic,$dr['topicid'].'|'.$dr['rate'].'|'.$dr['score'].'|'.$dr['critical'].'|'.$dr['topicname']);
	
	}
	$topic = array_unique($topic);
?>
</table head-top>

<div>
<?	
	$a2='';
	$b2=array();
	
	foreach($topic as $a2){
		$b2=explode("|", $a2);
			$topicrate=$b2[1];
			$topicscore=$b2[2];
			$critical=$b2[3];
		    $topicname=$b2[4];
			
			
?>
    <div style="float:left; width:100%; background-color:#99ff66; border-top-style: solid; border-top-width: 2px; border-top-color:#4dff88;">
        <div style="float:left; width:90%; background-color:#71FF81;">
            <div style="float:left; width:88.8888888%; background-color:#4dff88;">
				<div style=" text-align:left; margin-left:5px;">
					<div style="float:right; background-color:rgba(255,255,255,0.5); color:#FF2D31; border: 1px solid rgba(255,255,255,0.5);">
 						<?	if($critical == 0){?> !!! <? }?>
                        <?	if($critical == 1){?> !! <? }?>
                        <?	if($critical == 2){?> ! <? }?>
                    </div>
					<div style="padding-right:5px;"><? echo $topicname;?></div>
                </div>
            </div>
            <? echo $topicrate;?>
        </div>
        <? echo $topicscore;?>
    </div>
<?	
		$a1='';
		$b1=array();
		
		foreach($score as $a1){
			
			$b1=explode("|", $a1);
				$itemunscore=$b1[1];
				$itemname=$b1[2];
				$txtother=$b1[3];
			if($b1[0] == $b2[0]){
?>        
    <div style="float:left; width:100%; background-color:#f2ffe6; border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color:#FFFFFF;">
        <div style="float:left; width:90%; background-color:#e6ffee;">
			<div style="text-align:left; margin-left:25px;">
				<? echo $itemname;?>&nbsp;<? echo $txtother;?>
            </div>
        </div>
        <div style="color:#ffb3b3;"><? echo $itemunscore;?></div>
    </div>
<?
			}
		}
	}
?>
</div>
<? 
//pre($topic);
//pre($score);
?>
 
</div class="r_scroll">       
  </div font>
  
</div class="clear">
