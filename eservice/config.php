<?
########## app ID and app SECRET (Replace with yours) #############
$appId = '162413447233314'; //Facebook App ID
$appSecret = '703895277e757147b07eca4863190304'; // Facebook App Secret
$return_url = 'http://localhost/fblogin/';  //path to script folder
$fbPermissions = 'publish_actions,email'; // more permissions : https://developers.facebook.com/docs/authentication/permissions/

########## MySql details (Replace with yours) #############
$db_username = "root"; //Database Username
$db_password = ""; //Database Password
$hostname = "localhost"; //Mysql Hostname
$db_name = 'demo'; //Database Name
###################################################################

define("C_SPLITPAGE","30");
define("cfg_sqlconn", "driver={sql Server}; server=.; database=w; uid=p; pwd=sukishi20272027; AutoTranslate=no");
define("C_CHARSET","TIS-620\n");
define("xscreen","1024");
define("X_SCREEN2","512");
define("SHOWMSG",true);
define("cfg_database","w");
define('cf_db','w');
define('cf_mongoconn',"127.0.0.1:27017");
//define('cf_mongoconn',"127.0.0.1:27017");
define('cf_timeout',-1);
define('cf_timecheckonline',30);
define('cf_chkonline',30);
define('cfg_webaddress','');
define('cfg_defdevice','pc');
define('cfg_serverip','127.0.0.1');


?>