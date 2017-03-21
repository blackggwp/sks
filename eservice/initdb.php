<?

$host = 'shop2click.com';
$username = "irh9637_shopdb" ; // ชื่อผู้ใช้ในการติดต่อกับฐานข้อมูล
$password = "33103310" ; // password ในการเชื่อมต่อกับฐานข้อมูล
$dbname = "irh9637_shopdb" ;  // ชื่อฐานข้อมูล

$c = mysql_connect($host,$username,$password); // ติดต่อฐานข้อมูล

if (!$c){
    echo "<h3>ERROR : ไม่สามารถติดต่อฐานข้อมูลได้</h3>"; // ไว้แสดง error
    exit();
}else {
}
mysql_query("SET NAMES UTF8"); // สำหรับการติดต่อฐานข้อมูลแบบ UTF8
mysql_select_db($dbname,$c); // สำหรับเลือกชื่อฐานข้อมูลในการติดต่อไว้เลย
?>