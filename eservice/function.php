<?
function frequire($f){
if(file_exists($f)){
 require($f);
}
}
function q(){
  return $_GET;	
}
function txtconnv($v){
 return iconv('UTF-8','TIS-620',$v);
}
function txtconnv2($v){
 return iconv('TIS-620','UTF-8',$v);
}

function pre($v){  
    echo "<pre>";  
    print_r($v);  
    echo "</pre>";  
}
function readtextfile($filename)
{
	if(file_exists($filename)){return file_get_contents($filename);}else{
		echo ':File not found:',$filename;
		return "";
	}
}
function getk($k){
$all=explode("&",$k);
$a=array();
foreach($all as $s){
$s=explode("=",$s);
if($s[0]!=''){
$a[$s[0]]=$s[1];
}}
return $a;
}

function url2arr($url){
if(substr($url,0,1)=='&'){
$url='?'.substr($url,1,strlen($url)-1);
}
if(substr($url,0,1)!='?'){
$url='?'.$url;
}	
   $p = parse_url($url);
    parse_str($p['query'], $r);
return $r;
}
function reptp($dr,$tp,$col){
  $sall=explode(',',$col);
  foreach($sall as $s){
	   if(isset($dr[$s])){
	     $tp=str_replace('@'.$s.'@',$dr[$s],$tp);
	   }else {
	     $tp=str_replace('@'.$s.'@','',$tp);
	   }
  }
  return $tp;
}
function getcol($si,$colin){
   $r=array();
   $cols=explode(',',$colin);
   foreach($cols as $col){
	   $r[$col]=$si[$col];
   }
   return $r;
}
function getcoldata($si,$colin){
   $r=array();
   $cols=explode(',',$colin);
   foreach($cols as $col){
	   if($si[$col]!=''){
	    $r[$col]=$si[$col];
	   }
   }
   return $r;
}
function copycoldata(&$so,&$si,$colin){
   $cols=explode(',',$colin);
   foreach($cols as $col){
	   if($si[$col]!=''){
	   $so[$col]=$si[$col];
	   }
   }
}
function copycol(&$so,&$si,$colin){
   $cols=explode(',',$colin);
   foreach($cols as $col){
	   $so[$col]=$si[$col];
   }
}
function getarrcol($so,$colin){
   $arr=array();
   $cols=explode(',',$colin);
   foreach($cols as $col){
	   $arr[$col]=$so[$col];
   }
   return $arr;
}
function fillfield(&$so,&$si){
  foreach ($si as $key => $value) {
    $so[$key]=$value;
  }
}

function getserverurl(){
	return 'http://'.cfg_serverip;
 }
 function bimg($r,$mid){
	return 'http://'.cfg_serverip.'/u/u/'.$mid.'/img/b.jpg';
 }
function uimg($r,$mid){
	return 'http://'.cfg_serverip.'/u/u/'.$mid.'/img/u.jpg';
 }
 function uimgm($r,$mid){
	 $f=$r.'u/u/'.$mid.'/img/um.jpg';
	 if(file_exists($f)){
	   return 'http://'.cfg_serverip.'/u/u/'.$mid.'/img/um.jpg';
	 }else {
	   return 'http://'.cfg_serverip.'/u/u/'.$mid.'/img/u.jpg';
	 }
 }
function getcimg($r,$id){
	return 	$r."cc/".$id.'/img/c.jpg';

}

function createudir($r,$mid){
$imgsrc=$r.'u/u/'.$mid.'/img/u.jpg';
$fp=$r.'u/u/'.$mid.'/img/';
if(!file_exists($r.'u/u/'.$mid.'/img/u.jpg')){
   
   fixdirs($fp,0777);
   $rnum= rand (1,200);
   $f=$r."imgur/u (".$rnum.").jpg";
   if(file_exists($f)){
    copy($f,$imgsrc);
   } 
}	
}


function getuserimg($r,$mid){
$imgsrc=$r.'u/u/'.$mid.'/img/u.jpg';
$fp=$r.'u/u/'.$mid.'/img/';
if(!file_exists($r.'u/u/'.$mid.'/img/u.jpg')){
	fixdirs($fp,0777);
   $rnum= rand (1,200);
   $f=$r."imgur/u (".$rnum.").jpg";
   if(file_exists($f)){
    copy($f,$imgsrc);
   } 
}	
return $imgsrc;
}
function fixdir($s){
  return fixalldir($s, 0777);
}

function fixdirs($pathname, $mode){
 return fixalldir($pathname, $mode);
}
function fixalldir($pathname, $mode)
{
	if(!is_dir($pathname)){
    return mkdir($pathname,$mode, true);
	}
}

function gettime($tm){
return date('m-d H:i', $tm);
}
function gdate($timestamp){
	
	$diff = time() - $timestamp;
	$periods = array("s ", "m ", "h ");
	$words="ago";
	$dayago='d ago';
	$dayset='d';
	
	
//	$periods = array("s", "m", "h");
	//$words="";
	
	$sett=''; // เมื่อเวลา
	$setd=''; //  เมื่อวันที่
	
	if($diff<60){
		$i=0;
		$diff=($diff==1)?"":$diff;
		$text = "$diff $periods[$i]$words";	
		
	}elseif($diff<3600){
		$i=1;
		$diff=round($diff/60);
		$diff=($diff==3 || $diff==4)?"":$diff;
		$text = "$diff $periods[$i]$words";	
		
	}elseif($diff<86400){
		$i=2;
		$diff=round($diff/3600);
		$diff=($diff != 1)?$diff:"" . $diff ;		
		$text = "$diff $periods[$i]$words";	
		
	}elseif($diff<172800){
		$diff=round($diff/86400);
		$text = "$diff $dayago $sett " .date("g:i a",$timestamp);			
							
	}else{

		$thMonth = array("ม.ค.","ก.พ","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.");
		$date = date("j", $timestamp);
		$month = $thMonth[date("m", $timestamp)-1];
		$y = date("Y", $timestamp)+543;
		$t1 = "$date  $month  $y";
		$t2 = "$date  $month  ";		

		if($timestamp<strtotime(date("Y-01-01 00:00:00"))){
			$text = "$setd " . $t1. " " . date("G:i",$timestamp) . " น.";
		}else{					
			$text = "$setd " . $t2 . " " . date("G:i",$timestamp) . " น.";	
		}
	}
	if(trim($text)==''){$text='0';}
	if(trim($text)=="วินาทีที่แล้ว"){
	   $text="1 วินาทีที่แล้ว";
	}
	return $text;
}

function resizeimg($target, $newcopy, $w, $h) {
    list($w_orig, $h_orig) = getimagesize($target);
    $scale_ratio = $w_orig / $h_orig;
    if (($w / $h) > $scale_ratio) {
           $w = $h * $scale_ratio;
    } else {
           $h = $w / $scale_ratio;
    }
    $img = "";
	
	
	
    $ext = strtolower(end(explode('.',$target)));
	
	
	
$allow = array("jpg","jpeg","png","gif");
if (in_array($ext, $allow)) {
	
	
$dir=dirname($newcopy);
fixdirs($dir,0777);
		
	

 if ($ext == "gif"){ 
    $img = imagecreatefromgif($target);
    } else if($ext =="png"){ 
    $img = imagecreatefrompng($target);
    } else { 
    $img = imagecreatefromjpeg($target);
    }
    $tci = imagecreatetruecolor($w, $h);
    // imagecopyresampled(dst_img, src_img, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h)
    imagecopyresampled($tci, $img,0, 0, 0, 0, $w, $h, $w_orig, $h_orig);

    if ($ext == "gif"){ 
        imagegif($tci, $newcopy);
    } else if($ext =="png"){ 
        imagepng($tci, $newcopy);
    } else { 
        imagejpeg($tci, $newcopy, 90);
    }




}
   
}


function imgcrop($target,$newcopy,$left,$top ,$w, $h) {
	
    list($w_orig, $h_orig) = getimagesize($target);
    $src_x = ($w_orig / 2) - ($w / 2);
    $src_y = ($h_orig / 2) - ($h / 2);
	
	
    $ext = strtolower(end(explode('.',$target)));
    $img = "";
    if ($ext == "gif"){ 
    $img = imagecreatefromgif($target);
    } else if($ext =="png"){ 
    $img = imagecreatefrompng($target);
    } else { 
    $img = imagecreatefromjpeg($target);
    }
    $tci = imagecreatetruecolor($w, $h);
	
	    imagecopyresampled($tci, $img, 0, 0, $left, $top, $w, $h, $w, $h);
	
	
	fixdirs(dirname($newcopy),0777);
    if ($ext == "gif"){ 
        imagegif($tci, $newcopy);
    } else if($ext =="png"){ 
        imagepng($tci, $newcopy);
    } else { 
        imagejpeg($tci, $newcopy, 84);
    }
}
function cropimg($target,$newcopy, $w, $h, $ext) {
	
    list($w_orig, $h_orig) = getimagesize($target);
    $src_x = ($w_orig / 2) - ($w / 2);
    $src_y = ($h_orig / 2) - ($h / 2);
	
    $ext = strtolower(end(explode('.',$target)));
    $img = "";
    if ($ext == "gif"){ 
    $img = imagecreatefromgif($target);
    } else if($ext =="png"){ 
    $img = imagecreatefrompng($target);
    } else { 
    $img = imagecreatefromjpeg($target);
    }
    $tci = imagecreatetruecolor($w, $h);
	
	$left=200;
	$top=20;
    imagecopyresampled($tci, $img, 0, 0, $left, $top, $w, $h, $w, $h);
	
	
	fixdirs(dirname($newcopy),0777);
    if ($ext == "gif"){ 
        imagegif($tci, $newcopy);
    } else if($ext =="png"){ 
        imagepng($tci, $newcopy);
    } else { 
        imagejpeg($tci, $newcopy, 84);
    }
}
function img2jpg($target, $newcopy, $ext) {
    list($w_orig, $h_orig) = getimagesize($target);
    $ext = strtolower($ext);
    $img = "";
    if ($ext == "gif"){ 
        $img = imagecreatefromgif($target);
    } else if($ext =="png"){ 
        $img = imagecreatefrompng($target);
    }
    $tci = imagecreatetruecolor($w_orig, $h_orig);
    imagecopyresampled($tci, $img, 0, 0, 0, 0, $w_orig, $h_orig, $w_orig, $h_orig);
    imagejpeg($tci, $newcopy, 84);
}
function lcut($s){
  if(strlen($s) > 0){
	  return substr($s,1,1);
  }
  return $s;
}
function rcut($s){
  if(strlen($s) > 0){
	  return substr($s,0,-1);
  }
  return $s;
}
function getextname($fname){
 return end(explode(".", $fname));
}



?>