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


	$t=" SELECT *
			FROM tdepart
      		left JOIN checklist ON  (tdepart.departid = checklist.departid)
			left JOIN tgroup ON  (checklist.groupid = tgroup.groupid)
            left JOIN tchecklistlog ON  (checklist.topicid = tchecklistlog.topicid)
          	WHERE  tchecklistlog.refid = '".$q[rowid]."'
			ORDER BY checklist.rowid;
	";
	//echo $t;
	
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
?>

<div class="Idhead"><? echo $q[row];?></div>

<table class="head" border="0" width="100%">
	<tr>
    	<th style="width:10%" class="">ห้วข้อ</th>
        <th style="width:35%" class="">กลุ่ม</th>
		<th style="width:35%" class="">รายการ</th>
        <th style="width:10%" class="">เต็ม</th>
		<th style="width:10%" class="">ได้</th>
    </tr>
</table>   
<div class="r_scroll">
<table class="head" id="head1" border="0" width="100%">
	<tr style="font-size:0px;">
		<th style="display:none;">หัวข้อ</th>
        <th style="display:none;">กลุ่ม</th>
		<th style="display:none;">รายการ</th>
        <th style="display:none;">คะแนนเต็ม</th>
        <th style="display:none;">คะแนนที่ได้</th>
    </tr>    
<?	
	while($dr=mysql_fetch_array($objQuery)){
?>

    <tr>
        <td style="width:10%"><? echo $dr['departname'];?></td>
        <td style="width:35%"><? echo $dr['groupname'];?></td>
        <td style="width:35%"><? echo $dr['topicname']; ?></td>
        <td style="width:10%"><? echo $dr['rate']; ?></td>
        <td style="width:10%"><? echo $dr['score']; ?></td>        
    </tr>

<?  }?>
</table head-top> 
</div class="r_scroll">       
    
</div font>
