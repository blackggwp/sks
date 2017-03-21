<?
	require_once('connectdb.php');
	require_once('function.php');
	
	$q=$_POST;
	//pre($q);
	
	$thai_month_arr_short=array(
	"0"=>"",     
    "1"=>"01",     
    "2"=>"02",     
    "3"=>"03",     
    "4"=>"04",     
    "5"=>"05",     
    "6"=>"06",      
    "7"=>"07",     
    "8"=>"08",     
    "9"=>"09",     
    "10"=>"10",     
    "11"=>"11",     
    "12"=>"12" 
	);
	
	function thai_date_short($time){   // 19  ธ.ค. 2556  
    global $thai_day_arr,$thai_month_arr_short;     
    $thai_date_return.=date("j",$time);     
    $thai_date_return.="-".$thai_month_arr_short[date("n",$time)];
	$thai_year=(date("Y",$time)+543);      
    $thai_date_return.="-".substr($thai_year, 2, 4) ;     
    return $thai_date_return;     
    
}   
?>	
	<div>
<?

	$t=" SELECT *
			FROM tchecklisthead
			WHERE outletid LIKE '".$q[input_outlet]."' AND sumfalse >= '".$q[input_sumfalse]."' AND systemdate BETWEEN '".$q[input_date1]."' AND '".$q[input_date2]."' AND status != '0'
			ORDER BY systemdate DESC,systemtime DESC
			;
	";
	//WHERE outletid='".$q[input_outlet]."' and systemdate BETWEEN '".$q[input_date1]."' AND '".$q[input_date2]."'
	//echo $t;
	
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
?>
    
    <table table class="head" border="0" width="100%" height="6%">
		<th style="width:15%">สาขา</th>
        <th>refid</th>
		<th style="width:24.5%">วันที่</th>
        <th style="width:19%; margin-right:15%;">พนักงาน</th>
		<th style="width:22%;">คะแนน</th>
    </table head-top>
    
    <div class="r_heads">
    
    <table table class="head" border="0" width="100%">
		<!--<th>สาขา</th>
        <th>วันที่</th>
		<th>พนักงาน</th>
        <th style="width:">แสดงคะแนน</th>-->
<?	
	while($dr=mysql_fetch_array($objQuery)){
?>
		<tr>
			<td style="width:15%"><? echo $dr['outletid'];?></td>
            <td style="width:19.5%; font-size:13px;"><? echo $dr['refid']; ?></td>
            <td style="width:24.5%">
				<? echo thai_date_short(strtotime($dr['systemdate']));?><br>
                <a style="color:rgba(255,158,159,1.00);"><? echo substr($dr['systemtime'], 0, 5);?></a>
            </td>
			<td style="width:19%; margin-right:15%"><? echo $dr['empid']; ?></td>
			<td class="show_row" style="width:;">
            	<a class="show_datarow" rowid="<? echo $dr['refid']; ?>" row="<? echo $dr['Id']; ?>">
                	<input type="submit" style="width:100%; height:40px;" value="แสดง">
                </a>
            </td>
            <td  class="del_row">
            	<a class="del_datarow" rowid="<? echo $dr['refid']; ?>" row="<? echo $dr['Id']; ?>">
                	<input type="submit" style="width:100%; height:40px; color:rgba(255,98,100,1.00);" value="ลบ">
                </a>
            </td>
		</tr>
<?  }?>    
    </table>     
    </div>
  </div>
