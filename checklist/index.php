<html>
<head>
<link rel="stylesheet" type="text/css" href="app.css" />
<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script type="text/javascript" src="app.js"></script>
<script src="js/jquery.cookie.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  
</head>
<body>

<div id="waiting" style="text-align:center; height:100%;display:none">
   <div style=" position:fixed; left:0; right:0; top:50%; margin-top:-40px; background-color:rgba(255,255,255,0.70)">
    <img src="img/loading.gif" width="60px" height="60px" style="margin:5px"/>
    <div style="color:#FFFFFF; font-size:20px; font-family: Montserrat; background-color:rgba(0,0,0,0.7);">Please Wait...</div>
   </div> 
</div>

<div id="content"></div>
 
<div class="font-Montserrat">
    <div class="menu_head">
    <div class="H-menu"><div class="Br"></div>Menu</div>
    <div class="H-button"><img src="img/more.png" width="42" height="42" style="float:right"  id="btnhome"/></div>
    </div>
</div class="font-Montserrat"> 


<div style="text-align:center;">
<div id="panelc"></div>
</div>

<div class="topmain">&nbsp;</div>

<div class="main">
	<div class="btmain">
        <div id="mainmenu" style="text-align:center; padding:2px;">
         <div class="menitem" style="margin-left: auto; margin-right: auto;">
            <div class="questionitem">
                <div style="float:left; width:35%; height:100%;"><img src="img/tasks.png" width="70"/></div>
                <div class="textitem">&nbsp;บันทึก</div>
            </div>
         </div>
         <div class="menitem" style="margin-left: auto; margin-right: auto;">
            <div class="reportitem">
                <div style="float:left; width:35%; height:100%;"><img src="img/graph-1.png" width="70"/></div>
                <div class="textitem">&nbsp;รายงาน</div>
            </div>
         </div>
         <div class="menitem" style="margin-left: auto; margin-right: auto;">
            <div class="systemitem">
                <div style="float:left; width:35%; height:100%;"><img src="img/settings.png" width="70"/></div>
                <div class="textitem">&nbsp;เครื่องมือ</div>
            </div>
         </div>
         <div class="menitem" style="margin-left: auto; margin-right: auto;">
            <div class="loginitem">
                <div style="float:left; width:35%; height:100%; ">
                    <img src="img/user.png" width="50"/>
                    <div><input style="width:100px;" type="text" class="textbox" id="empname" readonly/></div>
                </div>
                <div class="textitem">&nbsp;Logout</div>
            </div>
         </div>
        </div>
    </div>
    <!--<div class="cenmain" style="height:10px;">&nbsp;</div>-->
 </div>
 <div class="lowmain">&nbsp;</div>
 <div class="confirm" style="display:none; width:100%; color:rgba(255,255,255,1.00); text-align:center; margin-left:auto; margin-right:auto; font-size:24px; font-family:CSPraJad-bold;">
 	<div style="cursor:default;">คุณต้องการออกจากระบบ</div><br>
    <div>
        <button id="out" style=" height:35px; width:60px; border-radius:5px; font-size:18px; cursor: pointer;">ใช่</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="in" style="height:35px; width:60px; border-radius:5px; font-size:18px; cursor: pointer;" >ไม่</button>
    </div>
 </div>
 
 </body>
</html>

