<? 
	$today = date("Y-m-d"); 
	//$today = date("Y-m-d H:i:s");
	//echo $today;
	
	require_once('connectdb.php');
	require_once('function.php');
	
	$q=$_POST;
	$t=" SELECT *
			FROM tchecklisthead
			WHERE tchecklisthead.systemdate='".$today."' AND tchecklisthead.outletid='".$q['outletid']."' AND tchecklisthead.empid='".$q['empid']."' AND status != '0'
			ORDER BY systemdate DESC,systemtime DESC
			;
	";
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
?>
&nbsp;&nbsp;
<select id="timeupload" style="height:32px;">
	<? while($dr=mysql_fetch_array($objQuery)){?>
	<option><? echo $dr['Id'];?></option>
    <? }?>
</select><br><br>

