<?
	// $connmssql = mssql_connect('192.168.0.235','sa','sukishi20272027');
	// if(!$connmssql) {
	// 	die('Could not connect:'.mssql_error());
	// }
	// mssql_select_db('[e-service]',$connmssql);

$hostname = '192.168.0.235';
$username = 'sa';
$password = 'sukishi20272027';
$database = 'e-service';

try {

	$conn = new PDO("sqlsrv:server=$hostname;Database = $database;", $username, $password);
	
} catch (Exception $e) {
	echo "Cannot connect DB : ".$e->getMessage();
}
?>