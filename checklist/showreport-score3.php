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

	$t=" SELECT checklist.rowid,checklist.departid,checklist.groupid,checklist.topicid,checklist.rate,checklist.topicname
			   ,tdepart.departname,tgroup.groupname,tchecklistlog.refid,tchecklistlog.score
		 FROM checklist
		 LEFT JOIN tdepart ON checklist.departid=tdepart.departid
		 LEFT JOIN tgroup ON checklist.groupid=tgroup.groupid
		 LEFT JOIN tchecklistlog ON checklist.topicid=tchecklistlog.topicid
		 WHERE tchecklistlog.refid='".$q[rowid]."'
		 ORDER BY checklist.topicid
	;";
	//echo $t;
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
?>
<div class="Idhead"><? echo $q[row];?></div>

<table class="head" border="0" width="100%">
	<tr>
    	<th style="width:75%" class="">ห้วข้อ</th>
        <th style="width:12.5%" class="">เต็ม</th>
		<th style="width:12.5%" class="">เหลือ</th>
    </tr>
</table>   
<div class="r_scroll">
<table class="head" id="head1" border="0" width="100%">
	<tr style="font-size:;">
		<th style="display:none;">ห้วข้อหลัก</th>
        <th style="display:none;">ห้วข้อย่อย</th>
        <th style="display:none;">รายการ</th>
		<th style="display:none;">คะแนนเต็ม</th>
        <th style="display:none;">คะแนนเหลือ</th>
    </tr>    
<?	
	$depart1=array();
	$group1=array();
	$rate1=array();
	
	while($dr=mysql_fetch_array($objQuery)){
		array_push($depart1,$dr['departid'].'|'.$dr['departname']);
		array_push($group1,$dr['groupid'].'|'.$dr['departid'].'|'.$dr['groupname']);
		array_push($rate1,$dr['groupid'].'|'.$dr['rate'].'|'.$dr['score']);
		
		$depart = array_unique($depart1);
		$group = array_unique($group1);
?>

    <tr>
        <td style="display:none;"><? echo $dr['departname'];?></td>
        <td style="display:none;"><? echo $dr['groupname'];?></td>
        <td style="display:none;"><? echo $dr['topicname'];?></td>
        <td style="display:none;"><? echo $dr['rate']; ?></td>
        <td style="display:none;"><? echo $dr['score']; ?></td>        
    </tr>
<?	
	}
?>
</table head-top>

<div>
<?
	$a1='';
	$b1=array();
    foreach($depart as $a1){
		$b1=explode("|", $a1);
			$departid=$b1[0];
			$departname=$b1[1];
		    
?>
    <? //echo $departname;?>
    <div style="float:left; width:100%; background-color:#41C87E;">
		<? echo $departname;?>
    </div>

	<!--<br>-->
<?
        $a2='';
        $b2=array();
        foreach($group as $a2){
            $b2=explode("|", $a2);
                $groupid=$b2[0];
                $departrow=$b2[1];
                $groupname=$b2[2];
            if($departrow == $departid){
?>
	<div style="float:left; width:100%; background-color:#ffeb99;">
		<div style="float:left; width:87.5%; background-color:#ffffcc;">
        	<div style="float:left; width:85.7142858%; background-color:#FEFFEA;">
            	<div style="float:left; text-align:left; margin-left:10px; margin-right:5px;">
					<? echo $groupname;?>
                </div>	

	<!--<br>-->
<?
            $a3='';
            $b3=array();
            foreach($rate1 as $a3){
                $b3=explode("|", $a3);
                    $grouprow=$b3[0];
                    $rate=$b3[1];
                    $score=$b3[2];
                if($b3[0] == $b2[0]){
                    $sumrate+=$rate;
                    $sumscore+=$score;
                
?>
	<?php /*?><div style="float:left; width:100%; background-color:#FBC7C8;">
    	<div style="float:left; width:50%;"><? echo $sumrate;?></div>
        <div style="float:left; width:50%;"><? echo $sumscore;?></div>
    </div><?php */?>
<? 
                }//if($b3[0] == $b2[0])
            }//foreach($rate1 as $a3)
?>
            </div>
			<? echo $sumrate;?>
    	</div>
    	<? echo $sumscore;?>
    </div>
<?
			$countrate+=$sumrate;
			$countscore+=$sumscore;
			
			$per=$countscore/$countrate*100;
			$per1 = number_format($per,1);
			
            $sumrate=0;
            $sumscore=0;
            }//if($departrow == $departid)
        }//foreach($group as $a2)
?>		
	<div style="float:left; width:100%; background-color:#ffe680;">
		<div style="float:left; width:87.5%; background-color:#ffffb3;">
        	<div style="float:left; width:85.7142858%; background-color:#FEFFEA;">
            	<div style="float:right; margin-right:5px;">
                	รวมคะแนน &nbsp;<? echo $per1;?>%
                </div>
    		</div>
			<? echo $countrate;?>
    	</div>
    	<div style="color:#FF4447;">
			<? echo $countscore;?>
        </div>
    </div>            
<?
			$getrate+=$countrate;
			$getscore+=$countscore;
			
			$per=$getscore/$getrate*100;
			$per1 = number_format($per,1);
			
			$countrate=0;
            $countscore=0;
	}//foreach($depart as $a1)
?>
	<div style="float:left; width:100%; background-color:#1BCCCF;">
		<div style="float:left; width:87.5%; background-color:#1BCCCF;">
        	<div style="float:left; width:85.7142858%; background-color:#1BCCCF;">
            	<div style="float:right; margin-right:5px;">
                	Total Score <? echo $per1;?>% 
                </div>
    		</div>
			<? echo $getrate;?>
    	</div>
    	<div style="color:#D01C1F;">
			<? echo $getscore;?>
        </div>
    </div>
	
</div>

 
</div class="r_scroll">       
</div font>
</div class="clear">
