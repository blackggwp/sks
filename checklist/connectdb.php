<?

$host = "localhost";
$username = "root";
$password = "88888888";
$conn = mysql_connect($host,$username,$password);
if($conn)
{
	
}
else
{
	echo "MySQL Connect Failed : Error : ".mysql_error();
      exit;
}
mysql_query("SET NAMES UTF8");
?>