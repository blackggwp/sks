<div class="font-Montserrat">
	<div class="H-menuA"><div class="Br"></div>/ System</div>
</div class="font-Montserrat">
<input  type="text" class="textbox" id="outletid" style="display:none;" readonly/>
<input  type="text" class="textbox" id="empid" style="display:none;" readonly/>
<br><br>
<form action="upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="fileToUpload" id="fileToUpload" style="height:32px; width:auto; font-size:16px; cursor: pointer;">
    <input id="uploads" type="submit" value="Upload Image" name="submit" style="display:none;">
</form>
<textarea id="comment" rows="4" cols="40" name="comment" form="usrform" placeholder="Enter text here..."></textarea><br><br>
<div style="width:100%; clear:both;">
	<div style="width:50%; float:left; text-align:right;">รายการที่ :</div>
	<div class="timeshow" style="width:50%; float:left; text-align:left;"></div>
</div>
<br><br><br><br>
<div style="width:100%; float:left;"><button type="button" id="uploadpic" style="height:32px; width:70px; font-size:16px; cursor: pointer;">save</button></div>
