<?
require('conn.php');
function icstr($s){
 // return iconv('tis-620','utf-8',$s);
  return $s;
}
?>



<div class="gpage" style="display:inline-block; text-align:left">
<div class="cform">
<table width="600" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="35">&nbsp;</td>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td>ขอรหัสพนักงาน</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td width="49">&nbsp;</td>
    <td width="129" align="right">สาขา</td>
    <td width="16"><a style="color:#F00">*</a></td>
    <td width="376"><select name="reqfromoutlet" id="select3" style="width:200px;">
      <?
// $query = mssql_query("select outletid as v,outletid+' : '+outletname as d from toutlet");

// while($r = mssql_fetch_assoc($query))
$query = "select outletid as v,outletid+' : '+outletname as d from toutlet";
  foreach ($conn->query($query) as $r) 
{ 
  $r['v']=icstr($r['v']);
  $r['d']=icstr($r['d']);
  
	 echo '<option value="',$r['v'],'">',$r['d'],'</option>';
}

	?>
      </select></td>
    <td width="80">&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">ประเภทพนักงาน</td>
    <td><a style="color:#F00">*</a></td>
    <td><select name="emptypeid" id="select4" style="width:200px;">
      
      <?
    // $query = mssql_query("SELECT   emptypeid as v,emptypeid+' : '+emptypename as d FROM   temptype");
// while($r = mssql_fetch_assoc($query))
    $query = "SELECT   emptypeid as v,emptypeid+' : '+emptypename as d FROM   temptype";
  foreach ($conn->query($query) as $r) 
{ 
  $r['v']=icstr($r['v']);
  $r['d']=icstr($r['d']);
  
	 echo '<option value="',$r['v'],'">',$r['d'],'</option>';
}
	?>
      </select></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">หมายเลขประชาชน</td>
    <td><a style="color:#F00">*</a></td>
    <td><input name="empperid" type="text" id="textfield2" maxlength="13" /></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">คำนำหน้า</td>
    <td><a style="color:#F00">*</a></td>
    <td><select name="empprefix" id="select" style="width:200px;">
     <?
// $query = mssql_query("SELECT   prefix as v,prefix+' : '+prefixdetail as d FROM   tempprefix");
// while($r = mssql_fetch_assoc($query))
$query = "SELECT   prefix as v,prefix+' : '+prefixdetail as d FROM   tempprefix";
  foreach ($conn->query($query) as $r) 
{ 
  $r['v']=icstr($r['v']);
  $r['d']=icstr($r['d']);
  
	 echo '<option value="',$r['v'],'">',$r['d'],'</option>';
}
?>
    </select></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">ชื่อ</td>
    <td><a style="color:#F00">*</a></td>
    <td><input type="text" name="empname"  /></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">สกุล</td>
    <td><a style="color:#F00">*</a></td>
    <td><input type="text" name="emplastname"  /></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">วันเกิด</td>
    <td><a style="color:#F00">*</a></td>
    <td><input name="birthday" type="text" id="birthday" readonly="readonly" placeholder="- Click Select -"  /></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">วันที่เริ่มงาน</td>
    <td><a style="color:#F00">*</a></td>
    <td><input name="empstartdate" type="text" id="empstartdate" readonly="readonly" placeholder="- Click Select -"  /></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">แผนก</td>
    <td><a style="color:#F00">*</a></td>
    <td><select name="departid" id="select2" style="width:200px;">
    
    <?
    // $query = mssql_query("SELECT     departid as v, departid+' : '+departname as d FROM         tdepartment");
// while($r = mssql_fetch_assoc($query))
    $query = "SELECT     departid as v, departid+' : '+departname as d FROM         tdepartment";
  foreach ($conn->query($query) as $r) 
{ 
  $r['v']=icstr($r['v']);
  $r['d']=icstr($r['d']);
  
	 echo '<option value="',$r['v'],'">',$r['d'],'</option>';
}
?>
	?>
    </select></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td>
    <div data-confirm="true" style="background-color:#CCC; padding:5px; cursor:pointer; width:200px; "
     data-a="&a=load&f=req.php&=.gpage&oj=#panelret"
     data-inf="&isshowwait=true&cform=.cform"
    >
    ยืนยันการขอรหัส
    </div>
    
    </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="75">&nbsp;</td>
    <td colspan="4">
    
    <div id="panelret"></div>
    
    </td>
  </tr>
  <tr>
    <td height="93">&nbsp;</td>
    <td colspan="4">&nbsp;</td>
  </tr>
  </table>
</div>
</div>
