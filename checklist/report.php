<? require_once('function.php'); ?>
<?
	require_once('connectdb.php');
	$today = date("Y-m-d");


	$t=" select * from tchecklisthead ORDER BY systemdate";
	
	$sql=$t;
	$objDB = mysql_select_db("db");
	$objQuery = mysql_query($sql) or die (mysql_error());
	
	
?>
<div class="font-Montserrat">
	<div class="H-menuA"><div class="Br"></div>/ Report</div>
</div class="font-Montserrat">

<div>
  <div class="r_top"></div>

  <div class="r_search">
	
          <select id="input_outlet">
            <option value="s%">-ทุกสาขา-</option>
            <option>s01</option>
            <option>s02</option>
            <option>s03</option>
            <option>s04</option>
            <option>s05</option>
            <option>s06</option>
            <option>s07</option>
            <option>s08</option>
            <option>s09</option>
            <option>s10</option>
            <option>s11</option>
            <option>s12</option>
            <option>s13</option>
          </select>          
      	  <div style="margin-top:-20px; color:rgba(231,218,218,1.00);">&nbsp;</div>
      	  <input id="input_date1" type="date" name="date" value="<? echo $today;?>" placeholder="จาก DD/MM/YYYY" />
          <div style="margin-top:-20px; color:rgba(231,218,218,1.00);">ถึง</div>
      	  <input id="input_date2" type="date" name="date" value="<? echo $today;?>" placeholder="ถึง  DD/MM/YYYY" />
      
	  	  <a class="moveshow2"><input id="button_search" type="button" value="ค้นหา"></a>
          <!--<a href="#show2"><input style="display:none;" id="moveshow2" type="button" value=""></a>-->
    </div>
  </div>
 
  <div class="show1" style="height:100%;">
    <div class="r_show1"></div>
  </div>
  
  <div class="scrollTo">
    <div class="dialog">
    	<input id="btnExcel" type="button" onclick="tableToExcel('head1', 'W3C Example Table')" value="Export to Excel">
    	<a name="scroll" class="close-thik"></a>
        
        <div class="r_show2"></div>
        <div class="hide-wait" style="display:inline-block; position:fixed; top:40%; right:0; left:0;">
            <div>
                <img src="img/loading.gif" width="100px" height="100px" />
                <div>Please Wait...</div>
            </div>
        </div>
	</div>
  </div>
  <!--<a name="show2"></a>-->
  <!--<div class="scrollTo">
    <div class="dialog">
    	<input id="btnExcel" type="button" onclick="tableToExcel('head2', 'W3C Example Table')" value="Export to Excel">
    	<a name="scroll" href="#" class="close-thik"></a>
        <div class="r_show3"></div>
	</div>
  </div>-->
  
</div body>


<!--<select id="input_date">
            <option>-วันที่-</option>

            
            <option></option>
            

       	  </select>-->
