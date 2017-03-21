<?
$r='../';
require($r.'init.php');

?>
<div class="gcell gxx" >
<div class="fullsc"  style="text-align:center; background-color:#D4D0C8">



<div style="width:100%; text-align:center; height:30px;background-color:#3E343F; color:#FFF">
<div style="text-align:center; width:960px;display:inline-block; text-align:left; height:30px;clear: both;">

<a class="savecmd"
data-a="&a=post&f=db/s_update.php&dform=#frmdata" data-dpr="&name=<?=$q['name'];?>"
>Save</a>

<a  data-a="&j=readrow&opr=-" class="keyboard_back"  style="color:#FFF">&lt;</a>
<a  data-a="&j=readrow&opr=+" class="keyboard_next" style="color:#FFF">&gt;</a>
</div>



</div>



<div class="fullsc_body" data-xycss=",-50" style="margin-top:30px;">


<br>
<div class="gcell cform" style="min-height:1000px; text-align:center;"  id="frmdata">
<a class="readdatarow"
data-a="&a=load&f=db/json.php&g=.gcell&oj=#pcell"
>readdatarow</a>

<div id="pcell">
<? require('json.php');?>
</div>

<div style="display:inline-block; text-align:left">
<input name="_id" type="text" />

<?
if($h['f']!=''){
$f='f/'.$h['f'].'.php';

$isfoundf=false;
if(file_exists($f)){
require($f);
$isfoundf=true;
}}
if(!$isfoundf){
	echo ' Template not found Check config <hr>';
   pre($q);
}

?>
</div>
</div>
</div>






<a  class="esccmd fullsc_btnclose" data-a="&j=jempty&g=.gxx" ></a>



</div>
</div>
