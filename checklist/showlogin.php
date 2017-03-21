<?
	require_once('connectdb.php');
	
	$q=$_POST;
	//print_r ($q);
	$t="SELECT * FROM login
			WHERE username='".$q[username]."' AND password='".$q[password]."'
	;";	
	
	$sql=$t;	
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
	
	$a=array();
	
	while($dr=mysql_fetch_array($objQuery)){
		
	$a["loginid"]=$dr[username];
	$a["outletid"]=$q[sect];
	$a["username"]=$dr[empname];
	
	}
		
	echo json_encode($a);

?>