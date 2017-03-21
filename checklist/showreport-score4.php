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

	$t=" SELECT *,SUBSTRING(picname,13) AS pic
		 FROM tchecklisthead
		 LEFT JOIN tchecklistpic ON tchecklisthead.Id=tchecklistpic.Id
		 WHERE tchecklisthead.refid='".$q[rowid]."'
	;";
	//echo $t;
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
?>
<div class="Idhead"><? echo $q[row];?></div>

<table class="head" border="0" width="100%" style="display:none;">
	<tr>
    	<th style="width:75%" class="">ห้วข้อ</th>
        <th style="width:12.5%" class="">เต็ม</th>
		<th style="width:12.5%" class="">เหลือ</th>
    </tr>
</table>   
<div class="r_scroll" style="height:91.13%; background-color:#F7F7F7;">
<table class="head" id="head1" border="0" width="100%">
	<tr style="font-size:;">
		<th style="display:none;">ห้วข้อหลัก</th>
        <th style="display:none;">ห้วข้อย่อย</th>
        <th style="display:none;">รายการ</th>
		<th style="display:none;">คะแนนเต็ม</th>
        <th style="display:none;">คะแนนเหลือ</th>
    </tr>    
<?	

	while($dr=mysql_fetch_array($objQuery)){
		
?>
	<?php /*?><div class="picture" style="width:100%; clear:both; background-color:#000000; float:left; text-align:center;">
    	<img class="pictureshow" src="uploads/<? echo $dr['pic'];?>" width="600px" style="max-width:100%; height:auto; " id="btnhome"/>
    </div><?php */?>
  <div style="clear:both; border-top-style:solid; border-top-width: 1px; border-color:#FFFFFF;">
    <div class="picture" style="width:50%; padding-top:2px; padding-bottom:2px; float:left; text-align:center;">
        <!-- Trigger the Modal -->
<? 		
		if($dr['pic']!=''){
?>
        <img class="myImg" src="uploads/<? echo $dr['pic'];?>" alt="<? echo $dr['comment'];?>" width="98%" style="max-width:100%; height:auto; ">
<? 		
		} 
?>
        <!-- The Modal -->
        <div id="myModal" class="modal">
        
          <!-- The Close Button -->
          <span class="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
        
          <!-- Modal Content (The Image) -->
          <img class="modal-content" id="img01">
        
          <!-- Modal Caption (Image Text) -->
          <div id="caption"></div>
        </div>
    </div>
    
	<div style="float:right; width:50%; padding-top:4px; word-wrap:break-word;">
		<div style="padding:5px;"><? echo $dr['comment'];?></div>
    </div>
  </div>
    
<?
	}
?>
</table head-top>
	

 
</div class="r_scroll">       
</div font>
</div class="clear">
