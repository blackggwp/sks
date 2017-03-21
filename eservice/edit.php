<?
if(!$init){
$r='../';
require($r.'init.php');
}

//pre($q);

$m     =  new Mongo(cf_mongoconn);
$c     =  $m->selectDB(cf_db)->selectCollection('tview');
$i=$c->findone(array('name'=>$q['name']));
$m->close();
$pr=url2arr($i[pr]);
?>
<div class="gpage dbgroup">
<div style="padding-left:3px; padding-right:3px;">
<? frequire($r.'db/t/'.$q['name'].'.php');?>
<div class="formfillter qenter"  data-a="&j=ojlink&g=.dbgroup&oj=.dbquery">
<? require('ptoolbar.php');?>
<? require('psearch.php');?>
</div>

<div style="background-color:#fff; height:30px;; margin-top:5px;">
  <? require('pdbedit.php');?>
</div>
<div style="background-color:#fff; height:120px; margin-top:5px;"><? require('pdatagrid.php');?></div>


<? frequire($r.'db/b/'.$i['name'].'.php');?>
</div>
</div>