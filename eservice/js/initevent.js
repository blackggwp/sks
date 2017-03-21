function initevent($fm_,callback){
// control 


var keyuptime = 1000; // 1 sec
var keyuptimeout = null;
var txtqtime = 2000; // 1 sec
var txtqqtime = 2000; // 1 sec
var txtqtimeout = null;
var txtqqtimeout = null;
var ojscroll=null;

function ontextchange($t){
var tval=$t.val();
try {
if(!$t.hasClass('urlex')){
	acmd($t,'');
}	
}catch(err){}


var $pq=$t.parent().find('#qqpanel');
if(tval==''){
 if(isfound($pq)){
  $pq.hide();
 }
}else {
 if(isfound($pq)){
  $pq.show();
 }
}


sys['txtq']=cstr($t.val());
var d=str2pr(cstr($t.data('inf')));
if($t.hasClass('txtqsearch')){
	 var $g=cpr($t,'.qsearchbox');
	 var $p=$g.find('#qsearchpanel');
	 if(tval !=''){
		 if($p.css('display')=='none'){
	     $p.slideToggle(100);
		 }
		  var $init=$g.find('.qsearchinit');
		  if(isfound($init)){
		      $init.click();
		  }
	 }else {
	     $p.hide();
	 }
	
}

var url =$.trim(tval);

if($t.hasClass('urlquery')){
	
if(url !=''){
	url=ltrim(url);
if(isurl(url)){	  
	  
	  
	  var $g=cpr($t,'.htmlbox');
	  var $gg=cpr($t,'.htmlboxg');
	  var $p=$g.find('#htmlbox');
	  

	  
	  
	  $gg.addClass('isprocessg');
	  
	  $p.empty();
	  $p.append('<input type="text" name="attachlink" value="'+url+'" /><br>');
  
     linkisimg($t.val(),function(url,r){
	   
	   if(r==true){
		 $p.append('<img class="imgselect"  data-input="defimg"   src="'+url+'" /><br>');
		 $p.append('<input type="text" name="otype"  value="image" /><br>');
		 $t.val('');
	     $gg.removeClass('isprocessg');
	   }else {
		   url=ltrim(url);
		   var pr={};
		   pr['url']=url.replace(' ','');
		   
		   doajax($t,'urlex/qurl.php',pr,function(r){
		   	
			
			
            var js= $.parseJSON(r);
			var imgl=js['images'].length;
			var h='';	
			var otype=cstr(js['otype']);
			
			switch(otype){
			default:
			if(imgl>20){
			  imgl=20;
			}			
			break;
			}
			
if(imgl>0){			
$p.append('<div class="imgselectbox">'+h+'</div>'); 
$p.append('<a>selectimg</a><br><img class="imgselect"  src="'+js['images'][1]+'" /><a>'+imgl+'</a><br><input type="text" value="@img@" id="txtimgurlquery" name="defimg" /><br>');		


		var $imgt=$p.find('img.imgselect');
		var $txtimg=$p.find('#txtimgurlquery');

		var d=0;
		var cal=0;
		var imgsrc='';
			for (var i=0; i<imgl; i++) {
			 var img = new Image();
img.onload = function() {
	cal=this.width*this.height;
	imgsrc=$(this).attr('src');
			if(cal > d){
				d=cal;
				$imgt.attr('src',imgsrc);
				$txtimg.val(imgsrc);
			}
            }
               img.src = js['images'][i];
			   
}
}

if(js['title']!=null){
		  $p.append('<a class="bkcolor">Title</a><br><input  type="text" name="title" value="'+js['title']+'" /><br>');
		 }
		 if(js['content']!=null){
		  $p.append('<a class="bkcolor">Content</a><br><input  type="text" name="content" value="'+js['content']+'" /><br>');
		 }
		  $p.append('<a class="bkcolor">Link</a><br><input type="text" name="attachlink" value="'+url+'" /><br>');
		  $p.append('<input type="text" name="otype" value="'+js['otype']+'"  />');

		 $t.val('');
		 
		  $gg.removeClass('isprocessg');
		
		});
	   }							 
     });

}}}



if($t.hasClass('urlq')){
  if(url !=''){
	  var $g=cpr($t,'.gurlq');
	  var $p=$g.find('#purlq');
     linkisimg($t.val(),function(url,r){
	 if(r==true){
		     var tp=cstr($t.attr('data-tp'));
			 var h=gettemplate(tp);
			     h=h.replace(/@src@/g,url);
				 $p.empty();
				 $p.html(h);	
				 initall($p,function(){});
				 $t.val('');
	 
	 }							 
    });
   }
}

if($t.hasClass('urlex')){
var $g=cpr($t,'.gurlex');
var $p=$g.find('#panelurlex');
if(url !=''){
linkisimg($t.val(),function(url,r){
 if(r==true){
  var h=gettemplate('.attachimg');	
     h=h.replace(/@src@/g,url);
   $p.empty();
   $p.append(h);
   $t.val('');
}
else {
try { 	

alert('urlex:'+url);
	
	
var s={};	
    s['url']=url;
	
   var pr =$.param(s);	

var $img;
$p.load('urlex/urlex.php',pr, function(r, status, xhr){
		$p.find('.isimgselect').each(function(){
		  $img=$(this);
		  $img.one("load", function(){
						
						
			    w=$(this)[0].offsetWidth;
				h=$(this)[0].offsetHeight;
				if(w < 24  || h < 24){
		           cpr($(this),'.ojselect1').remove();
				}
				
            }).attr("src", $img.attr('srct'));
		});
									   
});
}catch(err){alert(err);}
	

}
}
);

	
	
	

}
}


switch(cstr(d['k'])){
	
// wall post 	
case 'wallpost':

var url =$t.val();
var n=url.indexOf("http://www.youtube.com");
if(n!=0){
    n=url.indexOf("https://www.youtube.com");
}

var oj='';
if(n==0){
  oj='youtube';
}


switch(oj){
	
// check youtube	
case 'youtube':
try {
	
	
var v=url2arr(url);
var $p=cpr($t,'.postcontrol').find('#htmlattach');
var  h='<div class="gcell"><div data-a="&j=cprremove&oj=.gcell" class="icon-mclose"></div><br>';
     h+='<img src="https://img.youtube.com/vi/'+v['v']+'/0.jpg" />';
     h+='<input class="hide" type="text" name="attachlink" value="'+url+'"></div>';
     h+='<input class="hide" type="text" name="otype" value="youtube"></div>';
	 h+='<input class="hide" type="text" name="defimg" value="https://img.youtube.com/vi/'+v['v']+'/0.jpg"></div></div>';
$p.empty().append(h);
$('.txtpostwall').val('');
initall($p,function(){});

}catch(err){alert('youtube error'+err);}
break;

default:
linkisimg($t.val(),function(url,r){
 if(r==true){
  var $p=cpr($t,'.postcontrol').find('#htmlattach');
  var $defimg=$p.find('.defimg');
  if(!isfound($defimg)){
    var h='<div class="gcell"><div data-a="&j=cprremove&oj=.gcell" class="icon-mclose"></div><br>';
       h+='<img class="defimg" data-input="&name=defimg"   src="'+$t.val()+'" /><br>';
       h+='<div>Attach:<a target="_blank" href="'+$t.val()+'">'+$t.val();+'</a></div></div>'
       $p.prepend(h);
       initall($p,function(){});
  }else {
	  
     $defimg.attr('src',$t.val());
  }
  $t.val('');
 }else {
	 
     $p.html('link not image ');	 
 }
 
 
});

break;
}

break;
}
}


var thq;
$('.ojhover',$fm_).unbind('mouseenter').bind('mouseenter', function () {
try {										   
										   
var $t=$(this);
$ojhover=$t;

hvstate='in';
var hc=cstr($ojhover.data('hoverqclass'));
$('.hoverqF').removeClass('hoverqF');
if($ojhover.data('isset') != true ){

var h=gettemplate('.hoverqbox');

    h=h.replace(/@data-dpr@/g,cstr($ojhover.attr('data-dpr')));
    h=h.replace(/@class@/g,hc);

   $ojhover.wrap('<div class="refbox hoverq" />');
   $ojhover.before(h);
   $ojhover.data('isset',true);
   initall(cpr($t,'.hoverq').parent(),function(){});
}else {
	cpr($t,'.hoverq').removeClass('hoverqF');
}

clearTimeout(thq);
thq=setTimeout(function(){
	if(hvstate=='in'){
		
	var  $hcmd=cpr($ojhover,'.hoverq').addClass('hoverqF').find('.hqcmd');
	     $hcmd.attr('data-ppr',$.attr('data-ppr'))
	     $hcmd.click();
	}
},800);

}catch(err){alert('error ojhover'+err);}
});



function cmbpagenumber($t){
try {	

var $g=$t.parent();
var v=$t.val();
var opr=cstr(d['opr']);
var $oj;
var $ojn;
if(opr==''){
 $oj=$('.pagenum:contains('+v+')');
 if(!$oj.hasClass('pagenumF')){
   ojclick($oj);
 }
}else {
  $oj=$('.pagenumF');
if(opr=='+'){
  $ojn=$oj.next();
}
if(opr=='-') {
  $ojn=$oj.prev();
}
  if(isfound($ojn)){
   $ojn.click();
  }	

}
setTimeout(function(){
					
//var $oj=cpr($t,'.dbgroup').find('.pagecontrol:first');
// $('body').scrollTo($oj, { duration:'fast',axis:'y'});
var $oj=cpr($t,'.dbgroup').find('.p-query');
$oj.fadeOut(100);

setTimeout(function(){
$oj.fadeIn(100);

},100);

},1);
}catch(e){}

}
$(':input',$fm_).unbind('change').bind('change',function(){
try  {  



var $t=$(this);
if($t.hasClass('cmbpagenumber')){
	cmbpagenumber($t);
return;
}

$t.addClass('inputchange');
if(cstr($t.data('a'))!=''){
 acmd($t,null);
}


var $dbform=cpr($t,'.dbform');
if(isfound($dbform)){
    $dbform.addClass('dbformchange');
}

  
  
  
  if($t.val() != ''){
     $t.removeClass('isalert');
  }
  
if($t.hasClass('imgs')){


var v=$t.val();
var vs=v.split(',');
var $div=$t.parent().find('div.imgs:first');
var h='<img src="@imgurl@"  />';
     $div.empty();
   $.each(vs, function(k, v){
		$div.append(h.replace(/@imgurl@/g,v));			   
   });
   initall($div,function(){});
}  
  
  
}catch(err){}
});


$('.gridcontrol td',$fm_).unbind('mouseup').bind('mouseup',function(){
try  {  

$t=$(this);
if($t.find('.mcheck').length==0){
var txt=$t.text();
var $grd=cpr($t,'.gridcontrol');
var $chk;
if(isfound($grd)){
	$chk=$t.find('input');
	if(!isfound($chk)){
	$t.html('<div class="txtinlineedit" ><input type="text" value="'+txt+'" /></div>');
	$t.find('input').focus();
	}

}
}
}catch(err){}
});



function fuploadfile($g,files,i){
try { 
var im=files.length;
if( im >i ){
var file=files[i];	
	
// display 	

var picReader = new FileReader();
picReader.addEventListener("load",function(event){
$g.append("<img class='imgupload' src="+event.target.result+" />");
});


//picReader.readAsDataURL(file);	
	
var fdb = new FormData();
fdb.append('file',file);
fdb.append('login_id',loginid);
$.ajax({
        url: "cupload/i.php",
        type: "POST",
        data: fdb,
        async: false,
        contentType: false,
        cache: false,
	    processData: false,
		success:function(r){
			

    $g.append("<img class='imgupload' src="+r+" />");


             i+=1;
			 setTimeout(function(){
			fuploadfile($g,files,i);
            },300);
			 
		}
    });
}else {
  $g.find('.progressbar').hide();
  $g.append('<input name="defimg" value="'+$g.find('.imgupload:first')[0].src+'" >');
  $g.append('<input name="otype" value="image" >');
  $g.append('<input name="attachlink" value="'+$g.find('.imgupload:first')[0].src+'" >');
  
  var $img;
  var src='';
  var ir=0;
  try {
  $('.imgupload').each(function(){
     $img=$(this);
	   $g.append('<input name="defimgs['+ir+']" value="'+$img[0].src+'" >');
	   ir+=1;
  });
  
  }catch(e){alert('imgupload.error'+e);}
  
}

}catch(e){
alert('fuploadfile.error.'+e);
}

}


$('.cuploadcmd',$fm_).unbind('change').bind('change', function(event){
try {		
var $t=$(this);
var files = event.target.files; //FileList object
var fdb = new FormData();
var dpr=url2arr($t.data('dpr'));
$.each(dpr,function( k, v ) {
   fdb.append(k,v);
});
fdb.append('file',files[0]);
fdb.append('login_id',loginid);

$.ajax({
        url: "cupload/icmd.php",
        type: "POST",
        data: fdb,
        async: false,
        contentType: false,
        cache: false,
	    processData: false,
		success:function(r){
            
		}
    });
}catch(e){alert('error'+e);}
});



$('.cupload',$fm_).unbind('change').bind('change', function(event){
try {		


var $t=$(this);
var $g=cpr($t,'.formupload');
var files = event.target.files; //FileList object
$g.find('.progressbar').show();
setTimeout(function(){
			fuploadfile($g,files,0);
},300);
}catch(e){alert('error'+e);}
});
$('.cmblink',$fm_).unbind('change').bind('change', function () {
try { 											
											
var $t=$(this);
var val=$t.val();
var a=cstr($t.data('ojlink'));
if(a!=''){
a=a.split(',');


var $cmb=cpr($t,a[0]);

if(isfound($cmb)){
   $cmb=$cmb.find(a[1]);
if(isfound($cmb)){
	
   var f  = 'ss/oselect.php';
   var dpr=cstr($cmb.attr('data-dpr'))+'&v='+val;
   var q   = cstr($x.attr('data-q'));
   var s={};
	    if(q !=''){
	      s['q']=url2arr(q);
		}
   var pr =$.param(s);
   var d=pr+dpr
       d=d.replace(/@v@/g,val);
   $cmb.load(f,d, function(r, status, xhr){
		var value=$cmb.attr('data-setval');
		if(value!=''){
		    $cmb.find("option[value='"+value+"']").attr('selected', 'selected');
		}
		$cmb.trigger('change');				   
   });   
}
else {
  alert('cmblink not found'+a);
}
}
}
}catch(err){alert('cmblink.error.'+err);}
});

$('[href]',$fm_).unbind('click').bind('click', function (e) {
	
  var $t=$(this);
  
if($t.hasClass('chklogin')){
	if(!islogin){
	printmsg('you much login ');
     return;
	}

}
  
  
  var href=cstr($t.attr('href'));
  if (href.match("^http")) {
	  return;
  }
  
  
  e.preventDefault();
  var $t=$(this);
  if(cstr($t.data('saveurl'))=='true'){
	  saveurl=location.hash;
  }
  if(cstr($t.data('clearurl'))=='true'){
	  gurl='';
  }
  cfocus($t);
  urlupdate($t);
  if (e.target==this){
    $t.effect("highlight",{'color':'red'}, 500);
  }
});


$('.rowcheck',$fm_).unbind('click').bind('click', function () {
try {											
var $t=$(this);
   if(getcheckbox($t)){
     cpr($t,'.datarow').addClass('datarowF');
   }else {
     cpr($t,'.datarow').addClass('datarowF');
  } 
  
}catch(err){}
});

$('img.chkerr',$fm_).unbind('error').bind('error', function (e) {
var $t=$(this);
$t.addClass('imgerror');
$t.attr('srct',$t.attr('src'));
$t.attr('src','c/nophoto.png');
});

$('.mcheck',$fm_).unbind('dblclick').bind('dblclick', function (e) {
var $t=$(this);
var $oj=cprfind($t,'.dbgroup','.dbeditrow');
if(isfound($oj)){
	$oj.attr('data-ppr',$t.attr('data-ppr'));
    $oj.click();
	var $r=cpr($t,'.rowselectF');
	if(isfound($r)){
	    $r.removeClass('rowselectF');
	}
}
});


$('.qpaste',$fm_).unbind('paste').bind('paste', function (e) {
var $t=$(this);
setTimeout(function(){
var val=cstr($t.val());


try{
if(isurl(val)){
$('#link').val(val);
$('.init0_inputbox').click();
$t.val('');
}}catch(e){}


var $g=$t.parent();
var $init=$g.find('.qpasteinit0');
if(isfound($init)){
$init.click();



}

},100);
});

$('.mcheck',$fm_).unbind('click').bind('click', function (e) {
try {											
var $t=$(this);
var $tr=$t.parent().parent();
var $tb=$tr.parent();




if($tr.hasClass('rowselectF')){
	  $tr.removeClass('rowselectF');
}else {
	  $tr.addClass('rowselectF');
}


if(isshiftkey){
	
    $tr.addClass('cpoint');	
var $trt;
var isfoundf=false;
$tb.find('tr').each(function(){
   $trt=$(this);
   if($trt.hasClass('lastrowcheck')){
      isfoundf=!isfoundf;
   }
   if($trt.hasClass('cpoint')){
       isfoundf=!isfoundf;
   }
   if(isfoundf){
      $trt.addClass('rowselectmark');
   }
  
});

if(!isfoundf){
  $tb.find('.rowselectmark').addClass('rowselectF').removeClass('rowselectmark');
}else {
  $tb.find('.rowselectmark').removeClass('rowselectmark');
}

isshiftkey=false;

}

$tb.find('.lastrowcheck').removeClass('lastrowcheck');
$tr.addClass('lastrowcheck');


var $g=cpr($t,'.dbgroup');
if(isfound($g)){
var $dbselectrow=$g.find('.dbselectrow');
if(isfound($dbselectrow)){
    $dbselectrow.html('2222');
}
}



		
}catch(err){alert('datarowcheck error'+err);}
});



$('.tselect',$fm_).unbind('click').bind('click', function () {
var $t=$(this);
if($t.hasClass('tselectF')){
   $t.removeClass('tselectF');
}else {
   $t.addClass('tselectF');
}
var $c=$('.ntselectF');
if(isfound($c)){
	$c.html($('.tselectF').length);
}
});


$('.pagenum',$fm_).unbind('click').bind('click', function () {
 try {  
  
  
 
  var $t=$(this);
  var cval=cstr($t.text());
  var $g=$t.parent();
      $g.find('.pagenumF').removeClass('pagenumF');
	  $t.addClass('pagenumF');
   var $oj=cpr($t,'.dbgroup').find('.dbquery');
    if(isfound($oj)){
	  $oj.data('page',cstr(cnum($t.text())-1));
	  $oj.addClass('bypage');
	  $oj.click();
   }
   var $c=$g.find('.cmbpagenumber');
   if(isfound($c)){
	   if(cstr($c.val())!= cval){
	   $c.val(cval);
	   }
	}

 }catch(err){ alert('.pagenum.error.'+err);}
});

$('.kenter',$fm_).unbind('mouseenter').bind('mouseenter', function () {
var $t=$(this);
var k=cstr($t.attr('data-kenter'));
var $b=$('#bodyin');


kstate=k;
if(kstate=='hide'){
setTimeout(function(){
	
	if($b.data('isopen')){
	if(kstate=='hide'){
	   $b.animate({"left":'20px'},300, function(){
          $b.data('isopen',false);
		   $('#bbackbody').hide();
       });	
    }
	}

},1500);	
	
	

}else {
if($b.data('isopen')==false){
setTimeout(function(){
	
	if($b.data('isopen')){
	if(kstate=='show'){
	   $b.animate({"left":'250px'},300, function(){
          $b.data('isopen',true);
		   //$('#bbackbody').hide();
       });	

    }
	}

},1500);		    
}
}
});

$('.scrollfill',$fm_).unbind('scroll').bind('scroll', function () {
try { 											  

var $t=$(this);

if($t.scrollTop()==0)
{
 var $oj=cpr($t,'.scrollfillg').find('.scrollfillt');
	if(isfound($oj)){
	   $oj.click();
	}
}
if($t.scrollTop() + $t.innerHeight()>= $t[0].scrollHeight)
{
	var $oj=cpr($t,'.scrollfillg').find('.scrollfillb');
	if(isfound($oj)){
	   $oj.click();
	}
}

}catch(err){}
});


$('.dgridbody',$fm_).unbind('scroll').bind('scroll', function () {
try { 											  
											  
var $t=$(this);
var $g=cpr($t,'.gridg');
var $sef=$g.find('.scrollef');
$sef.scrollLeft($t.scrollLeft());


}catch(err){}
});


try{
$(".dropzone",$fm_).dropzone(
{url:"upload/upload.php",
 paramName: 'photos',
dictDefaultMessage: "Click or Drag your images For upload....",
enqueueForUpload: true,
uploadMultiple: false,
addRemoveLinks: true,
parallelUploads:1,
});
}catch(e){}



$('.mentercmd',$fm_).unbind('mouseenter').bind('mouseenter', function () {
var $t=$(this);
    $t.addClass('isenter');
	setTimeout(function(){


if($t.hasClass('isenter')){
var   $xb=$('#xbox');
if($xb.data('isopen')!=true){
	//$('._callxboxshow').click();
}
}
	   
	},10)

});
$('.mentercmd',$fm_).unbind('mouseleave').bind('mouseleave', function () {
var $t=$(this);
    $t.removeClass('isenter');
    setTimeout(function(){
	   if(!$t.hasClass('isenter')){
		   
		   
var   $xb=$('#xbox');
if($xb.data('isopen')==true){
	// $('._callxboxshow').click();
}
		   
	   }
	},5000)
});

$('.chkresize',$fm_).unbind('resize').bind('resize', function () {
try{									
   var $t=$(this);
   var $g=cpr($t,'.datagrid').find('.gridcontrol');
   var $gh=cpr($t,'.datagrid').find('.gridcontrolh');
   var w=$t.width();
   var colname=cstr($t.attr('data-colname'));
   var $oj=$g.find('[data-colname="'+colname+'"]');
       if(isfound($oj)){
		   $oj.width(w);
	   }
}catch(err){}
});

$('ul.selectlist > li',$fm_).unbind('click').bind('click', function () {
try{									
   var $t=$(this);
   var val=$t.text();
   var $txt=cpr($t,'.qqbox').find('input:eq(0)');
   if(isfound($txt)){
      $txt.val(val);
	  $txt.attr('data-sval',val);
	  $txt.trigger('change');
	  $txt.trigger('textchange');
   }
   $('.qqpanel').hide();
   
   
}catch(err){}
});


$('.txtqq',$fm_).unbind('textchange').bind('textchange', function () {
																   
var $t=$(this);
var $txtqq=$t;

if(!$t.hasClass('qlive')){
var val=$t.val();
var $ft=cpr($t,'.qqbox').find('.fillter');
var lsearch;
if(isfound($ft)){
	if(val!=''){
	      $ft.find("li:not(:ifillter(" + val + "))").hide();
          $ft.find("li:ifillter(" + val + ")").show();	
		  lsearch=$ft.find("li:ifillter(" + val + ")").length;
		  $t.attr('data-lsearch',lsearch);
	}else {
	      $ft.find("li").show();
	}
}
}else {



$txtqq.addClass('txtqqwait');
	 clearTimeout(txtqqtimeout);
     txtqqtimeout = setTimeout(function() {  
		 $('.txtqqwait').removeClass('txtqqwait');	
		 
		 var $q=cpr($t,'.qqbox').find('.qqpanel');
		 var pr='&txtsearch='+$txtqq.val()+$txtqq.attr('data-ppr');
		 $q.load('ss/qqlive.php',pr, function(r, status, xhr){
	         initall($q,function(){});
	     });
		 
		 
	}, txtqqtime);	


}

	
});
$('.txtqq').unbind('focus').unbind('focus').bind('focus', function () {
try{									
   var $t=$(this);
   var $g=cpr($t,'.qqbox');
   var $p=$g.find('.qqpanel');
   var $oj=$g.find('.init1');
   var val=$t.val();
   
      $t.attr('data-sval',val);
   
      $('.qqpanel').hide();

   
     $qqpanel=$p;

        $t.data('show',true);
	    $oj.attr('data-ppr',$t.attr('data-ppr'));
		if(!$t.hasClass('qlive')){
		   $oj.click();
		}
		$qqpanel.show();
  

}catch(err){}
});

$('.txtqq').unbind('blur').bind('blur', function () {
try{	

   var $t=$(this);
   var $g=cpr($t,'.qqbox');
   var $p=$g.find('.qqpanel');
   
	   
 var  lsearch=cstr($t.attr('data-lsearch'));
 if(lsearch=='0'){
   $t.val($t.attr('data-sval'));
 }
}catch(err){}
});

$('.txtcell').unbind('textchange').bind('textchange', function () {
   var $t=$(this);
       $t.addClass('txtrequpdate');
});
$('.txtq').unbind('textchange').bind('textchange', function () {
	// clear any 
	$('.txtqwait').removeClass('txtqwait');
var $txtq=$(this);
    $txtq.addClass('txtqwait').addClass('txtreqchange');
	 clearTimeout(txtqtimeout);
     txtqtimeout = setTimeout(function() {  
		 $('.txtqwait').removeClass('txtqwait');
		 if($txtq.hasClass('txtreqchange')){
            ontextchange($txtq);
		 }
		 $txtq.removeClass('txtreqchange');
		 
	}, txtqtime);									
});

$('.qenter',$fm_).unbind('keyup').bind('keyup',function(e){
$t=$(this);														
if (e.keyCode == 13) {
 if(cstr($t.data('a'))!=''){
  eventcmd($t);
 }
} 
});	

$(':input',$fm_).unbind('keyup').bind('keyup',function(e){	
try{		
$t=$(this);
if (e.keyCode == 13) { 
//=================================================
$t.removeClass('txtreqchange');
// save data
var sval=cstr($t.data('vals'))
if(sval==''){
	  var d=[];
	  d.push($t.val());
	  $t.data('vals',d);
}else {
var vals=$t.data('vals');
    vals.push($t.val());
   $t.data('vals',vals);
}
//=================================================
if(cstr($t.data('a'))!='' && cstr($t.val()) != '' ){
 eventcmd($t);
}
}


// check typing delay
if($t.hasClass('delay')){
	$t.addClass('qdelay');
    clearTimeout(keyuptimeout);
    keyuptimeout = setTimeout(function() {  
									   alert('call');
       acmd($t,null);
	   $t.removeClass('qdelay');
	}, keyuptime);
	
}







}catch(err){alert(err);}
});

function checkuplaod(){
try {
var $g=$('#uploadbox');
if(isfound($g)){
	
	var nc=$g.find('.preview').length;
	var nt=$g.find('.success').length;
      $g.find('.upload_total').html(nc);
	  $g.find('.upload_current').html(nt);
	  if(nc>0 && nc==nt){
	   alert('update success');
	  }

}

}catch(err){}
}



function updateqinfo(){
try{
var $t;
var a;


$('[data-qinfo]').each(function(){
								
$t=$(this);
a=url2arr($t.data('qinfo'));

var val=a['v'];
switch(val){
case 'fisonline':
var v=a['d'].split(',');
var $oj;

   $('.fisonline').removeClass('fisonline');
   $.each(v, function(k, v){
		$oj=$('[data-chatlistid="'+v+'"]');
		$oj.addClass('fisonline');
   });
break;
default:
$(a['v']).html(a['d']);
break;
}

});	


$('.nullhide').each(function(){
		var $tx=$(this);
		var txt=cstr($tx.text());
		switch(txt){
		case '':
		 $tx.hide();
		break;
		case '0':
		 $tx.hide();
		break;
	    default:
		$tx.show();
		break;
		}
});
}catch(err){
alert('updateqinfo.error'+err);
}
}



function updateurl(){
if(gurl==''){
      // gurl=location.hash;
}
// check process to call url
var isaction=false;
if(gurl!=location.hash){
isaction=true;
}
if(isaction){
updatesystemurl();
var urlc=urldiff(gurl,location.hash).replace('#','');
var url=location.hash.replace('#','').split('/');
var c='';	
if(urlc.indexOf('@')==0){
 c='_url'+url[0];
 var $ojc=$('.'+c);
 if(isfound($ojc)){
   $ojc.click();
   $ojc.trigger('mousedown');
 }
}else {
	
 
urlc=geturlcode(urlc,location.hash);
var $oj=$('[data-urlq="'+urlc+'"]')

if(isfound($oj)){
$oj.click();
$oj.trigger('mousedown');
}	

}

$('.urlcmd').html(urlc);
// update set url
gurl=location.hash;

}

}

$('#timer2',$fm_).everyTime(10000,function(i){
try{
var $oj=$('.timer2');
if(isfound($oj)){
}

}catch(err){}
});

$('#timer',$fm_).everyTime(1,function(i){
try {
	try { 
       var ilen=$('.fullsc:not(:hidden)').length;
	    if(ilen > 0){
		    $('body').css('overflow','hidden');
	    }else {
		    $('body').css('overflow','auto');
		}
		
		
	}catch(err){}
checkuplaod();	
urlcall();

}catch(err){onerror('loop',err);}
});	

/*
function urlchangepr(){
var arr1=url2arr(cstr(gurl.split('?')[1]));
var arr2=url2arr(cstr(location.hash.split('?')[1]));

$.each(arr2, function(k, v){
	
	alrt(k);
});


}*/

function readurl2systemval(){
try {
	var h=location.hash.replace("#/",'');
    var hr=url2arr(h);
     if(cstr(hr['fid'])!=''){
      sys['fid']=cstr(hr['fid']);
     }
}catch(e){}
}
function urlcall(){

var h=location.hash;
var h1='';	
var s='';
var $oj;
if(gurl!=location.hash){
	
		readurl2systemval();
		submiturl();
		
		h1=h.slice(0, h.lastIndexOf("?"));	
		h1=h.slice(0, h1.lastIndexOf("/"));	
		s='[data-href="'+h1+'"]';
		$oj=$(s);
		if(cstr(gurl.split('?')[0])!=cstr(location.hash.split('?')[0])){
			if(isfound($oj)){
			  req_changepr=true;
			  ojclick($oj);
			}
		}
	urltrigger();
	gurl=location.hash;
}
}
// empty panel popup
function submiturl(){
try{	
var h=location.hash.replace("#/",'');
var n = h.search('&r=');
if(n=='-1'){
  try{ $('._rempty').empty();}catch(e){}
}

 
/*
 if(n =-1){
	 alert('-1'+h);
   // try{ $('._rempty').empty();}catch(e){}
 }else {
	   alert('empty');

	}

   if(n==-1){}else{
	   alert('clear r');
    try{ $('._rempty').empty();}catch(e){}
   }
	*/
}catch(e){}
}

function urltrigger(){
	
var h=location.hash;
var h1=h.split('?')[0];
var s='';
var $ojall;
var $oj;
var s1='';
var s2='';
var r=false;


s1=cstr(gurl.split('?')[1]);
s2=cstr(location.hash.split('?')[1]);

s1=url2arr(s1);
s2=url2arr(s2);


if(gurl!=h||urlreq==true){
		s='[data-href^="'+h1+'"]';
		$ojall=$(s);
		$ojall.each(function(){
		$oj=$(this);
		if(isfound($oj)){
		   q=url2arr(cstr($oj.data('href')))
		   $.each(q, function(k, v){
				 if(cstr(s1[k])!=cstr(s2[k])){
							if(cstr(s2[k])!=''){
							 $oj.click();
							 r=true;
							}
												  
				 }
		   });
		 }
		});
       //===================================	
	    var hx='';
		$.each(s2, function(k, v){
		if(cstr(s1[k])!= cstr(s2[k])){
			hx=v.slice(0, v.lastIndexOf(","));	
			
			s=cstr(v.split(',')[0]);
			$oj=$('[data-href="&'+k+'='+hx+'"]');
			if(isfound($oj)){
				ojclick($oj);
			}else {
			   $oj=$('[data-href="&'+k+'"]');
			    ojclick($oj);
				if(v.split(',').length>2){
				 //alert('check root');
				}
			}
			
		 }
		});
}
gurl=location.hash;
return r;
}



function geturll(d,il){
	var s='';
il-=1;	
for(var i=0; i<il; i++){	
s+=d[i]+'/';
}

if(s!=''){
s=rcut(s);
}
if(s==''){
s='@';
}else {
s+='/@';
}
return s;
}

function urlfindlink(){
try {	
var h=location.hash.split('?')[0];
h=h.replace('#/','');
var d=h.split('/');
var il=d.length;
var sl='';
var $oj;
var f='';
for(var i=0; i<il; i++){
	f=geturll(d,(il-i));
	sl='[data-href="'+'#'+f+'"]';
	$oj=$(sl);
	if(isfound($oj)){
      iurlnode=1;
     $oj.click();
	break;
	}
}

}catch(err){ alert('urlfindlink.error'+err);}
}
function urlcmd(){

var $oj;
var hm=location.hash;
if(gurl==''){
   gurl=location.hash;
}




if(gurl!=location.hash||urlreq==true){
var h=	location.hash;





gurl=location.hash;
urlreq=false;

h=h.replace('#/','');
h=h.split('?')[0];
var a1=h.split('/');



var s='';
for(var il=0; il < a1.length; il++){
if(il< (a1.length-1)){
   s+=a1[il]+'/';
 }else{
   s+='@'+'/';
 }	
}
if(s!=''){
s=rcut(s);
}
var sl;
var s0;


  h=hm.split("&")[0];

// 1 math  page?pg=wall&a=a&b=b
s0='[data-href="'+hm+'"]:last';
$oj=$(s0);

if(!isfound($oj)){
// 2 check math start	path?pg=wall
sl='[data-href="'+h+'"]:last';
$oj=$(sl);
}

// 3 check math root ex path?
if(!isfound($oj)){
h=hm.split("?")[0]+"?";
sl='[data-href="'+h+'"]:last';
$oj=$(sl);
}

// 4 root 
if(!isfound($oj)){
sl='[data-href="#'+s+'"]:last';
$oj=$(sl);
}

if(isfound($oj)){
	$oj.click();
}else {
	alert('root link');
   urlfindlink();
}
}}
function ticurl(urlin){

 
var hurl=urlin.replace('#/','');
var i=0; 
var s='';
var s2='';
var h,h2;

h=hurl.split('/');
h2=hurl.split('/');


switch(h[0]){
case 'u':
sys['fid']=h[1];
break;
}


$.each(h, function(k, v){
if(i>0){
h[i]='@'+i;
}
i+=1;
});					



s=arrpath(h);
h[(h.length-1)]=h2[h2.length-1];
s2=arrpath(h)

var $o=$('[dhref="'+s2+'"]');
if(!isfound($o)){
$o=$('[dhref="'+s+'"]');
}
if(isfound($o)){
	$o.click();
}else {
	
	printmsg(urlin);
	

}
}

$('.privatepage',$fm_).unbind('click').click(function (event){
try {

var $t=$(this);
$t.removeClass('privatepage').addClass('privatepageq');
if($t.data('isp')!=true){
   $t.data('isp',true);	
	$(this).addClass('pagereq');
var $q=cpr($(this),'.c-loopw').find('.q');
if(isfound($q)){
    $q.click();
}else {
}
}
	
}catch(err){}
});

$('.doption',$fm_).unbind('click').click(function (event){
try {
var $oj=$('.fieldwatchF');
    $oj.text($(this).text())
}catch(err){}
});

function onddl($t,docallback){
try {

cfocus($t);
var i=str2pr($t.data('inf'));
var $g=cpr($t,i['ddlg']);
if(isfound($g)){
var s=cstr($g.data('ddl'));
if(s!=''){
s=str2pr(s);
}else{

s={};
}


var sall=str2pr(cstr($t.data('ddl')));
$.each(sall, function(k, v){
 s[k]=v;
});


$g.data('ddl',getparam(s));	
var gpr=str2pr(cstr($g.data('ddl')));
var $oj=$g.find(i['ddloj']);
var $oj2;

if(isfound($oj)){
$oj.each(function(){
$oj2=$(this);
if(cstr($oj2.data('reqpr'))!=''){
var reqpr=str2pr(cstr($oj2.data('reqpr')));
$.each(reqpr, function(k, v){

  var pr=cstr($oj2.data('dpr'));
  if(pr==''){pr={};}else{pr=str2pr(pr);}
   $.each(v.split(','), function(index, v2){
     pr[v2]=gpr[v2]
   });
  var spr= getparam(pr);
   $oj2.attr('data-'+k,spr)
   
});
}


var reqpr=str2pr(cstr($oj2.data('reqattr')));
if(cstr($oj2.data('reqattr'))!=''){
var reqattr=str2pr(cstr($oj2.data('reqattr')));
$.each(reqattr, function(k, v){
  $oj2.attr(k,gpr[v]);
});
};
});


$g.find(i['ddloj']+'[data-ev="md"]').trigger('mousedown');
$g.find(i['ddloj']+'[data-ev="c"]').click();


}
}

docallback();
}catch(err){onerror('ddl:',err);}
}



$('.stope',$fm_).unbind('click').bind('click',function (e){
    e.stopPropagation();
});

function _oncmd($t){
 try {
cfocus($t);

if(cstr($t.data('ddl'))!=''){
onddl($t,function(){
if(cstr($t.data('a'))!=''){
  acmdall($t);
}});
}else {
if(cstr($t.data('a'))!=''){
  acmdall($t);
}}

}catch(err){
   };
}

$('.efocus',$fm_).unbind('focus').bind('focus',function (e){
    _oncmd($(this));
});
$('[data-event="touch"]',$fm_).unbind('touchstart mousedown');
$('[data-event="touch"]',$fm_).bind('touchstart mousedown',function(e){
	    e.preventDefault();
var $t=$(this);		
if($t.attr('data-confirm')=='true'){
var $b= $('#confirmboxw');

    if(!$b.data('ischeck') ){
	    $b.data('ischeck',true);
	    $b.show();
		$ojeclick=$t;
	}else {
	  if($b.attr('data-ret')=='y'){
		 _oncmd($t);
 	  }
	  $b.data('ischeck',false)
	}
}else {
    _oncmd($t);
}	




if($t.attr('data-clickeffect')=='true'){
 	$t.effect("highlight",{'color':'red'}, 500);
}
	  
});



function eventcmd($t){
try{	
	
	
//  check field	
var cform=cstr(url2arr(cstr($t.attr('data-inf')))['cform']);
var bformcheck=true;
if(cform!=''){
var $frm=cpr($t,cform);
var val='';
$frm.find('[required]').each(function(){
val=cstr($(this).val());
if(val==''){
bformcheck=false;
}
});
}

if(!bformcheck){
	printmsg("*=Require Field");
return;
}



if($t.attr('data-confirm')=='true'){
var $b= $('#confirmboxw');
    if(!$b.data('ischeck')){
	    $b.data('ischeck',true);
	    $b.show();
		$ojeclick=$t;
	}else {
	  if($b.attr('data-ret')=='y'){
		 _oncmd($t);
 	  }
	  $b.data('ischeck',false)
	}
}else {
    _oncmd($t);
}	
if($t.attr('data-clickeffect')=='true'){
 	$t.effect("highlight",{'color':'red'}, 500);
}
}catch(e){alert('eventcmd.error.'+e)}
}

$('[data-a]',$fm_).unbind('click').bind('click',function (e){
														  
var $t=$(this);

if($t.hasClass('qenter')){
 return;
}
if($t.hasClass('chklogin')){
	if(!islogin){
	 printmsg('you much login ');
     return;
	}
}

var  tagname=getojtag($t);
var isallow=true;
if(tagname=='inputsearch'||tagname=='inputtext'){
	isallow=false;
}

if(isallow){
var href=cstr($t.attr('href'));
if(href!=''){
if($t.data('req')==true){
   dataa($t);
   $t.data('req')=false;
}	
}else{
  dataa($t);
}
}

  if (e.target==this){
    $t.effect("highlight",{'color':'red'}, 500);
  }


});

function dataa($t){
if($t.data('c')!=true){
 $t.data('c',true);
}else{
 $t.data('c',false);
}

var tag=getojtag($t);
switch(tag){
case 'inputtext':
break;
default:
eventcmd($t);
break;
}
}


$('.c-dropdown-toggle',$fm_).unbind('click').click(function (event){
try {
	
var $oj=cpr($(this),'.c-dropdown').find('.c-dropdown-menu').toggle();
$('.c-dropdown-menu').not($oj).hide();
	
}catch(err){}
});



$('.c-1option > *:not(:input)',$fm_).unbind('click').click(function (e){
try {
	
	var $t=$(this);
	var $g=cpr($t,'.c-1option');
	var c=cstr($g.data('cfocus'));
	var val=cstr($t.data('val'));
	
	
	
	$g.attr('data-vval',val).data('vval',val);; // virtual values
	$g.find('.'+c+'F').removeClass(c+'F');
	$t.addClass(c+'F');


}catch(err){alert('c-1option error:'+err);};									 
});


$('.c-tab > *',$fm_).unbind('mousedown').bind('mousedown',function (e){
try {
	
	
var $t=$(this);
var $g=cpr($t,'.c-tabw');
var $gtab=cpr($t,'.c-tab');
var tabid=$t.parent().data('tabid');
var $tpage=$g.find('.c-tabp[data-tabid="'+tabid+'"]');
var d=$t.data('d');
var fclass=cstr($gtab.data('fclass'));
var tag=cstr($t.data('tag'));

if(tag!=''){
var $b=$g.find(':input:eq(0)');
if(isfound($b)){
	$b.val(tag);
}
}


$gtab.attr('data-vval',tag).data('vval',tag);
$gtab.attr('data-tabindex',d).data('tabindex',d);
if(fclass != ''){
	 $g.find('.'+fclass+'F').removeClass(fclass+'F');
	 $t.addClass(fclass+'F');
}





var $tabselect=$tpage.find('> div:eq('+d+')');
$tpage.find('> div').hide();
$tabselect.show();


// istart  x1_init
var $ojj=$tabselect.find('.'+tabid+d+'_init');
if(isfound($ojj)){
if($ojj.data('isrun') != true){
   $ojj.data('isrun',true);
   $ojj.click();
}}



}catch(err){};									 
});

$('.mc-tab > *',$fm_).unbind('click').bind('click',function (e){
try {
	
	
var $t=$(this);
var $g=cpr($t,'.mc-tabw');
var $gtab=cpr($t,'.mc-tab');
var tabid=$t.parent().data('tabid');
var $tpage=$g.find('.mc-tabp[data-tabid="'+tabid+'"]');
var d=$t.data('d');
var fclass=cstr($gtab.data('fclass'));
var val=cstr($t.attr('data-val'));



$gtab.attr('data-vval',val).data('vval',val);
if(fclass != ''){
	 $g.find('.'+fclass+'F').removeClass(fclass+'F');
	 $t.addClass(fclass+'F');
}



var $tabselect=$tpage.find('> div:eq('+d+')');
$tpage.find('> div').hide();
$tabselect.show();


// istart
var $ojj=$tabselect.find('.'+tabid+d+'_1click');
if(isfound($ojj)){
if($ojj.data('isrun') != true){
   $ojj.data('isrun',true);
   $ojj.click();
}}



}catch(err){};									 
});




function acmdall($t){
try{

var sinput=getojtag($t);


if(sinput=='inputtext'){
}else {

var dall=getpr($t);
var d;
if(cnum(dall.length)==0){
	d=dall;
    acmd($t,d)
}else {
$.each(dall, function( key, value ) {
    acmd($t,value)});
}}	
	
}catch(err){onerror('acmdall',err);}
}


function acmdex($t,d){
try{	
}catch(err){}
}

function acmd($t,d){
	
acmdex($t,d);	
	
if(d==''){
 d=getpr($t)
}	
var tg=$t[0].tagName.toLowerCase();
var ojtype=cstr($t.attr('type'));
if(d==null){
 var d=str2pr(cstr($t.data('a')));
}	


switch(d['a']){

case 'chatlist':
woschatlist($t,d);
ischatconnect=true;
$('.inputchat').show();
break;
case 'callchat':
try {
	var  $ojj=$('.chatlistitem[data-mid="'+d['fid']+'"]');
$ojj.click();
if($t.hasClass('calertitem')){
$t.remove();
}	
}catch(err){ alert('callchat error'+ex);}
break;


case 'post':

var  tagname=cstr($t[0].tagName.toLowerCase());
if($t.hasClass('vals')){
$t.val('');
}


if($t.hasClass('isprocess')){
 break;
}
try { 


var pr=getparameter($t);
var isallow =$t.data('isallow');

var f='ss/p.php'
var $frm;
var $ojj;
var key=cstr($t.attr('data-key'));
var inf=cstr($t.attr('data-inf'));

if(cstr(d['f'])!=''){
f=cstr(d['f']);	
}

if(islogin){
          key=key.replace(/@login_id@/g,sys['login_id']);
	      key=key.replace(/@aname@/g,sys['aname']);
		  
}

if(inf!=''){
 inf=str2pr(cstr($t.data('inf')));
  if(cstr(inf['cform'])!=''){
    $frm=cpr($t,cstr(inf['cform']));
     if(isfound($frm)){
       pr['field']=getdataform($frm);
     } 	
   }
  

// pass paramter class uplo
if(cstr(inf['classlookup'])!=''){

var allcl=cstr(inf['classlookup']).split('|');	
var clin='';
for(i = 0; i < allcl.length; i++){
	clin=allcl[i];
	
var cl=clin.split(',');	
var $gcl=cpr($t,cl[0]);
if(isfound($gcl)){

var st={};
$gcl.find(cl[1]).each(function(){
		addojval(st,$(this));					   
});
pr[cl[1].replace('.','')]=st;
}
}
}

if(cstr(inf['gcheckall'])!=''){
$frm=cpr($t,inf['gcheckall']);
$ojj=$frm.find(inf['ojcheckall']);
var rcheck=[];
$ojj.each(function(){
	if($(this).is(':checked')){
     rcheck.push($(this).data('rowid'));
	}
	
});
pr['rows']=rcheck;
}




if(cstr(inf['clist'])!=''){
 var $g=cpr($t,inf['clist']);
 var list=[];
  $g.find(inf['clistoj']).each(function(){
	 list.push( $(this).attr(inf['clistattr']));
  });
 }
pr['lists']=list;
}




pr['ppr']=gdb['ppr'];
if(key!=''){
 pr['key']=str2pr(key);
}

if(tg=='input'){
  pr['vals']=$t.data('vals');
}




// clear data befor 
$t.data('vals',null);
$t.data('isrun',true);
if(ojgroup($t)=='text'){
$t.addClass('reqsend');
}



pr['valex']=valex;

bpost($t,function(isallowr){
if(isallowr){
	


	
	$t.addClass('isprocess');
	if(cstr(d['showwait'])!='false'){
	 $t.prepend('<div class="refbox loadingbox"><img class="imgprocess" src="img/wait.gif" />');
	}
	
msgbox(f+':'+pr);	
$t.addClass('_isposting');
$t.effect("highlight",{'color':'#51A351'}, 1000);



var dform=cstr(d['dform']);
if(dform!=''){
try {
var $fx=$(dform);
if(isfound($fx)){
    $fx.wrap("<form id='fxpost'></form>" );
	var dx=$('#fxpost').serializeJSON();
		pr['dx']=dx;
    $fx.unwrap();
 }}catch(e){}
}
	


//alert(f+pr);
doajax($t,f,pr,function(r){
//alert('return='+r);
$t.removeClass('_isposting');
if(r!=''){
	
msgbox('r.'+r);
	gdb['ppr']=null;	

  // clase status 
  $t.removeClass('isprocess');
  var $ojwait=$t.find('.imgprocess:first').parent();
  if(isfound($ojwait)){
     $ojwait.remove();
  }
  if(ojgroup($t)=='text'){
	  
     if($t.data('vals')!=null){
		 acmd($t);
	 }else {
	   $t.data('isrun',false);
	   $t.removeClass('reqsend');
        rpost($t,r);
	 }
   }else {
     rpost($t,r);
	 $t.data('isrun',false);
	 $t.removeClass('reqsend');
   }
}
});


}
});
}catch(err){ 
alert('a.post.error'+err);
};
break;

case 'resetform':
alert('reset form');
var $g=cpr($t,d['g']);
$g[0].reset();
$g.find('img[data-input]').attr('src','').hide();
$g.find('.input-clearhtml').html('');

break;
	
case 'expand':
var $oj=$t.parent().parent().find('.ojexpand:eq(0)');
if(isfound($oj)){
$oj.slideToggle();
}
break;

case 'load':
try{
	
	
	
var $g=null;
if(cstr(d['g'])!=''){
$g=cpr($t,d['g']);
$g.addClass('isprocess');
}
if(cstr(d['renew'])=='true'){
	 cpr($t,d['g']).find(d['oj']).empty();
}
}catch(err){}


if(!$t.hasClass('isprocess')){
var $p;
if($t.hasClass('1loady')){
if(cstr(d['g'])!=''){
 $p=getoj($t,d);
}else {
 $p=$(d['oj']);
}
	
if($p.hasClass('showtg')){
if($p.css('display')!='none'){
 $p.hide();
}else {
 $p.show();	
}
}
break;
}

var isfirstload=false;
var fill='';
$t.addClass('isprocess');
$t.addClass('q');

if(cstr(d['g'])!=''){
 $p=getoj($t,d);
}else {
 $p=$(d['oj']);
}



if(isfound($p)){
  $p.addClass('p-query');
}


if($p.html()==''){
isfirstload=true;
}





var $poj;
var pr =$.param(getparameter($t));//+dpr;	
var is_setreload=true;
var is_allow=true;
var option=str2pr(cstr($t.attr('data-option')));
// check pagereq
var $pagereq=$p.find('.pagereq:first');



if(isfound($pagereq)){
// private page  
 pr+='&pg='+cstr($pagereq.data('pg'))+"&pageinfo=false";
 $poj=$pagereq;
}else {

// private panel
if(cstr(d['panel'])!=''){
$poj=$p.find('#'+d['panel']);
 if(!isfound($poj)){
	 $p.prepend('<div  class="app" id="'+d['panel']+'">new panel</div>');
	 $poj=$p.find('div:first');
	 $poj.data('rebind','r');
 }	
}else {
     $poj=$p;
}

}



if(isfound($poj)){

if(cstr($t.data('inf'))!=''){
var sinf=str2pr(cstr($t.data('inf')));
if(sinf['reload']=='false'){
   is_setreload=false;
}
}
if(is_setreload==false && $poj.data('ojstate')==1){
   is_allow=false;
}



if(cstr($t.attr('data-ppr'))!=''){
var ppr=str2pr(cstr($t.attr('data-ppr')));
if(cstr(ppr['clearpanel'])=='true'){
  $poj.empty();
}	
// fill data prepend or append 
if(cstr(ppr['fill'])!=''){
try { 

var trowid=getojdata($poj,'[data-rowid]:first','rowid');
var browid=getojdata($poj,'[data-rowid]:last','rowid');

var rowattr=cstr(ppr['rowattr']);
if( rowattr !='' ){
 trowid=getojattr($poj,'['+rowattr+']:first',rowattr);
 browid=getojattr($poj,'['+rowattr+']:last',rowattr);
}


}catch(err){
 alert('call.error'+err);
}



pr+="&trowid="+trowid+"&browid="+browid;
switch(cstr(ppr['fill'])){
case 't':
	$poj.prepend('<div class="fill tfill"></div>');
	$poj=$poj.find('.fill:first');	
	fill='t';
break;
case 'b':
	$poj.append('<div class="fill bfill"></div>');
	$poj=$poj.find('.fill:last');	
	fill='b';
break;
}
}}


if(is_allow){
	
$poj.addClass('isprocess');
if(cstr(option['showwait'])!='false'){
 $poj.prepend('<div class="refbox"><img class="imgprocess" src="img/wait.gif" /></div>');	
}



var $pinfo;


if($t.hasClass('bypage')){
  pr=$t.data('pr');
  pr+='&page='+$t.data('page');
}else {
 $t.data('pr',pr);
}


/*
if(isdebug()){
var $px=$('#pcheckdebug');
    $px.load('tool/pcheck.php',pr, function(r, status, xhr){
			initall($px,function(){});								
   });
}
*/
// load 

if(cstr(d['f'])==''){
var f=location.hash.replace('#/','').split('?')[0]+'/index.php';
if(iurlnode==-1){
d['f']=f;
}else {
if(iurlnode==1){
 f=location.hash.replace('#/','').split('?')[0];
 f=f.split('/')[0]+'/index.php';
 d['f']=f;
 iurlnode+=1;
}else{
var sl='';
 f=location.hash.replace('#/','').split('?')[0];
 f=f.split('/');
for(var il=0; il<iurlnode; il++){
sl+=f[il]+'/';
}
sl=rcut(sl);
d['f']=sl+'/index.php';
 iurlnode+=1;
}
}


}


pr+='&valex='+valex;
kseq+=1;
//alert('load:file ' +d['f']+'   :'+pr);

//alert(cstr(kseq)+'  '+$t.html()+'load:file ' +d['f']+'   :'+pr);

//loadcheck
$poj.empty();
var isfounddata=true;

// save query to datastore
if(cstr(d['saveq'])!=''){
var $ojg=cpr($t,cstr(d['saveq']));
if(isfound($ojg)){
	$ojg.data('pr',pr)
	    .data('f',cstr(d['f']));
}
}
// ginfo
if(cstr(d['ginfo'])!=''){
var $ojg=cpr($t,cstr(d['ginfo']));
if(isfound($ojg)){
	pr=$ojg.data('pr');
	var vdpr=cstr($t.data('dpr'));
	pr=sumurl(pr,vdpr);
}
}



var dform=cstr(d['dform']);
if(dform!=''){
try {
var $fx=$(dform);
if(isfound($fx)){
    $fx.wrap("<form id='fxpost'></form>");
	var dx=$('#fxpost').serialize();
	pr=sumurl(pr,dx);
    $fx.unwrap();
 }}catch(e){}
}

$t.data('pr',pr);

jload($t,$poj,cfilename(cstr(d['f'])),pr, function(r, status, xhr){
	if($t.hasClass('1load')){
	   $t.removeClass('1load').addClass('1loady');
	}		
	if($g!=null){
	$g.removeClass('isprocess');
	}


							  
msgbox('r.'+r);

					
if(cstr(sval['isroom'])=='true'){
 sval['isroom']='';
var $frow=$('.rlog-item:first');
if(isfound($frow)){
 cfg['rlogrowa']=$frow.data('rowid');
}
}							  
							  
$t.removeClass('isprocess');

// set remove mark
$poj.find('.imgprocess').parent().remove();
$poj.removeClass('isprocess');							
$pinfo=$poj.find('.pageinfo:last');


//startpageinfo
if(isfound($pinfo)){
	
var v	=url2arr(cstr($pinfo.attr('data-pageinfo')));
	msgbox('pinfo'+v['totalrowq']);
if($poj.hasClass('fill')){
if(v['totalrowq']=='0'){
	$poj.remove();
    isfounddata=false;
}else {
    isfounddata=true;
	try{
        if (!isfirstload){
	     $poj.effect("highlight",{'color':'#614DD5'}, 1000);
    }}catch(err){}
	
    var $pqq=cpr($poj,'.p-query');
	if($pqq.hasClass('yfull')){
      $pqq=$('body');
    }
}
}
//endpageinfo


}


    $poj.removeClass('tfill').removeClass('bfill').removeClass('fill');
	$p.find('.pagereq').removeClass('pagereq');
	if($poj.hasClass('privatepageq')){
		$p.find('.privatepage:first').show();
	}
	if(cstr(d['setclass'])!=''){
		  $poj.addClass(d['setclass']);
		  $p.find('.'+d['setclass']).hide();
		  $poj.show();
	  }
	  
	  rload($t,$p,$poj);
 
	  $t.removeClass('bypage');
	  $poj.data('state',1);	
	  $poj.data('rebind','r');
	 
	 
	 
if(cstr(option['scrollb'])=='true'&& isfounddata ){
       bottomscroll($p,100);
}
if(cstr(option['scrollbb'])=='true'&& isfounddata ){
       //bottomscroll($('body'),100);
}
	 
initall($poj,function(){
	   if( fill!=''){
		   var $pp=$poj.parent();
		   var $ojhtml=$poj.contents().clone(true);
			   $poj.remove();
		   if(fill=='t'){
		      $pp.prepend($ojhtml);
		   }else {
		      $pp.append($ojhtml);
		   }
	   }
	 });
});
}else {
	
//   $t.removeClass('isprocess');
}

}else {
	alert('not found panel for load : '+cstr($t.attr('data-a')));
}
}

break;
case 'qdir':
var path=d['path'];
var $p=$t.parent().find('div:first');
var f='ss/dir-pj.php';
var pr='&p='+path;
$p.load(f,$.param(gpost(pr), true), function(response, status, xhr){
     initall($p,function(){});
});
break;

case 'animate':
try {
var $oj=$(d['oj']);
$oj.show();
if(isfound($oj)){
var vtime=400;
if(cstr(d['time'])!=''){
vtime=cint(d['time']);
}	
	clearanimate($oj);
	if( cstr($oj.attr('data-state'))!='on'){
        $oj.attr('data-state','on');
 	    $oj.animate(d['on'],vtime, function(){});
	}else {
	   $oj.attr('data-state','off');
 	   $oj.animate(d['off'],vtime, function(){});
	}
	
}

}catch(err){alert('animate error:'+err)}
break;


}


try{
	cmdex($t,d);
}catch(exx){}


switch(d['j']){
case 'qinfo':
try {
var f='f/qinfo.php';
var pr={};
var fids=[];
pr['sys']=getsys();

$('[data-chatlistid]').each(function(){
fids.push($(this).data('chatlistid'));
});
pr['fids']=fids;
doajax($t,f,pr,function(r){
rpost($t,r);
});

}catch(e){
alert('qinfo.error.e'+e);
}

break;
case 'initupdate':
readdatastore();
break;
case 'readdatastore':
readdatastore();
break;
case 'setdatastore':
try{
var js = $.parseJSON($t.text());
	$.each(js, function( k, v ) {
	valstore[k]=v;
	});
}catch(e){}
break;
case 'noti_msg':
var h=$t.html();
setTimeout(function(){
$('.noti_msg').remove();
},800);
break;

case 'saveselect':
try{
var $g=cpr($t,d['g']);
var v='';
var attr=cstr(d['attr']);
var arr=[];
$g.find(d['oj']).each(function(){
v=$(this).attr(d['attr']);
arr.push(v);
});
var $input=$('.photoselectF > :input');
$input.val(arr);
$input.trigger('change');
}catch(e){alert('saveselect.error'+e);}
break;

case 'webstoreinfo':
try {
var $h=$(webstore[cstr(d['k'])]);
initall($h,function(){
});
}catch(e){}
break;
case 'webstore':
try{
	
var h=$t.html();
webstore[cstr(d['k'])]=h;
isupdatewebstore=true;

}catch(e){}
break;
case 'takelogin':
try  {
	
var $g=cpr($t,'.cform');
var mid=$g.find('[name="mid"]').val();
var aname=$g.find('[name="aname"]').val();

islogin=true;
loginid=mid;

sys['login_id']=mid;
sys['aname']=aname;

$('._sysval').each(function(){
sys[$(this).attr('name')]=$(this).val();
});



}catch(e){alert('takelogin.error.'+e);}

break;

case 'rq':
try{
var r=url2arr(location.hash)['rq'].split(',');
var q=cstr(r[0]);
var $oj=$('[data-rq="'+q+'"]');
if(q!=''){
ojclick($oj);
}
}catch(e){}
break
case 'jpost':
try {
var $g=cpr($t,d['g']);
var f=cstr(d['f']);
var pr=$g.serialize()+cstr($t.attr('data-dpr'));

try{
    pr+="&login_id="+cstr(gdb['login']['mid'])+'&aname='+cstr(gdb['login']['aname']);
}catch(e){}

pr+="&hurl="+location.hash;
doajax($t,f,pr,function(r){
          rpost($t,r);
});
}catch(e){
alert('call jpost.error'+e);
}
break;




case 'jpushattr':
var $g=$t.parent();
var s='';
if(cstr(d['g'])!=''){$g=cpr($t,d['g']);}
var $tx;
$g.find(d['oj']).each(function(){
$tx=$(this);
s=cstr($tx.data('reqattr'));
if(s!=''){
s=s.split(',');
$tx.attr(s[1],$t.attr(s[0]));
}
});
break;

case 'jfillter':
var $g=cpr($t,d['g']);
var txt=$t.val();
var $o;

$g.find(".'"+cstr(d['oj'])+"':contains('"+txt+"')").show();
$g.find(".'"+cstr(d['oj'])+"':not(:contains('"+txt+"'))").hide();
break;

case 'jsontp':

  var js= $.parseJSON($t.text());
  var tp=js['tp'];
  var rows=js['rows'];
  var cols=js['cols'].split(',')
  

  var h='';
  $t.empty();
 $.each(rows, function (index, row) {
	h=tp;
	$.each(cols,function( k,v ) {
		h=h.replaceall('@'+v+'@',row[v]);
	});
 $t.append(h);
 });
  
  

break;

case 'addtp':

var $g=$t.parent();
var h=$g.find('.tp').html();
var $p=$g.find('.tpcell');
var $txt=$g.find(':input:eq(0)');
var v=$txt.val();
if(v!=''){
    h=h.replace(/@v@/g,v);
if(isfound($p)){
	$p.append(h);
	$txt.val('');
	callinitall($g);
}}
break;
case 'grid-updatedata':
var $g=cpr($t,d['g']);
var $oj=$g.find(d['oj']);
if(isfound($oj)){
	var h=$oj.eq(0).find('tbody').html();
	$oj.eq(1).find('tbody').html(h);
	$oj.eq(0).remove();

}
break;


case 'callpage':
try {	

var $g=$t.parent();
var v=$t.val();
var opr=cstr(d['opr']);
var $oj;
var $ojn;
if(opr==''){
 $oj=$('.pagenum:contains('+v+')');
 if(!$oj.hasClass('pagenumF')){
   ojclick($oj);
 }
}else {
  $oj=$('.pagenumF');
if(opr=='+'){
  $ojn=$oj.next();
}
if(opr=='-') {
  $ojn=$oj.prev();
}
  if(isfound($ojn)){
   $ojn.click();
  }	

}
setTimeout(function(){
					
//var $oj=cpr($t,'.dbgroup').find('.pagecontrol:first');
// $('body').scrollTo($oj, { duration:'fast',axis:'y'});
var $oj=cpr($t,'.dbgroup').find('.p-query');
$oj.fadeOut(100);

setTimeout(function(){
$oj.fadeIn(100);

},100);

},1);
}catch(e){}
break;
case 'grid-rowfillter':
try{
var $g=$t.parent();
var $i=$g.find('.inputfillter');
var $j;
var name='';
var s='';
var v='';
$i.each(function(){
	$j=$(this);
	v=$j.val();
	name=$j.attr('name');
	if(v!=''){
	s+='&'+name+'='+v;
	}
});
var $gg=cpr($t,'.dbgroup');
var $s=$gg.find('._s');
    $s.val(s);
var $ojc=$gg.find('.dbqueryfill');	
	setTimeout(function(){
ojclick($ojc);
	},1);
}catch(e2){}

break;
case 'jinit':
var $p=getoj($t,d);
if(isfound($p)){
  $p.data('isbind','r');
  initall($p,function(){});
}
break;

case 'addhtml':
var $p=getoj($t,d);
if(isfound($p)){
$p.append($t.html());
}
break;

case 'ui-noti':
var $p=$('#noti');
if(!isfound($p)){
$('body').append('<div id="noti" ></div>');
}
var h='<div class="noti"><img src="ui/done.png" />'+$t.text()+'</div>';
$p=$('#noti');
$p.prepend(h);
var $oj=$('.noti:first');
setTimeout(function(){
	$oj.remove();
},1000);
$t.remove();
break;

case 'ui-toggle':
var $g=$t.parent();
var $oj=$g.find(d['oj']);
var delay=cstr(d['delay']);

if(!isfound($oj)){
$oj=$g.find('> *:eq(1)');
}

if(isfound($oj)){
	if(delay==''){
	$oj.slideToggle(0);
	}else{
	$oj.slideToggle(cint(delay));
	}
	$('.jtoggle').not($oj).hide();
}
break;
case 'cfocus':
var $g=cpr($t,d['g']);
var c=cstr(d['c']);
    $g.find('.'+c+'F').removeClass(c+'F');
	$t.addClass(c+'F');
break;
case 'c1click':
var c=cstr(d['c']);
var $oj=$(c);
if(isfound($oj)){
$oj.click();
$oj.removeClass(cstr(d['c']));
}
break;
case 'selectrowupdate':

var val=$t.val();
var $g=$t.parent();
var $oj=$g.find('.col_'+val);
$g.find('.rowmutiupdate').hide();
$oj.show();

break;
	
	
case 'form_clear':
try{
	
	
var $g=cpr($t,d['g']);
try{
$g[0].reset();
}catch(ex){}

$g.find('img[data-input]').attr('src','').hide();
$g.find('.input-clearhtml').html('');
$g.find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $g.find(':checkbox, :radio').prop('checked', false);
}catch(e2){}
break;
case 'saveurl':
saveurl=location.hash;
break;
case 'restoreurl':
location.hash=saveurl;
gurl=saveurl;
break;
	
case 'tr2table':
try{
	
	
var $g=cpr($t,'.dbgroup');

var $table=$g.find('table.datagrid');
var $tr1=$table.find('tr:eq(0)');
var $tr2=$table.find('tr:eq(1)');

    $table.empty();
    $table.append($g.find('table:eq(0) tr'));
	$table.prepend($tr2);
	$table.prepend($tr1);
}catch(err){ alert('tr2table.error')}
break;	
	
	
case 'jumpclick':
var $g=cpr($t,d['g']);
var $oj=$g.find(d['oj']);
var $ojnext;
if(d['opr']=='+'){
 $ojnext=$oj.next();
}
if(d['opr']=='-'){
 $ojnext=$oj.prev();
}
if(isfound($ojnext)){
$ojnext.click();
}else {
alert('not found link');
}



break;
case 'cclick':
try{
$(d['c']).click();
}catch(err){}
break;

case 'cpranimate':
var $g=cpr($t,d['g']);
var a1=$t.data('a1');
var a2=$t.data('a2');
var ax;
if($t.data('isanimate') != true){
	$t.data('isanimate',true);
	ax=a1;
}else{
	$t.data('isanimate',false);
	ax=a2;
}
clearanimate($g);
$g.animate(ax, function(){
 });


break;


case 'exprpanel':


var tag=d['tag'];
var $g=$('.ojbox');
var $tab=$g.find('.ojtab');
var $d=$tab.find('> *').eq(d['d']);
var $b=$('.mainrpanel');
$d.trigger('mousedown');

if($g.data('tag')==tag){
 $b.toggle();
}else {
 $b.show();
}
$g.data('tag',tag);
if($b.css('display')!='none'){
if(cstr(d['init'])!=''){
	ojclick($(d['init']));
 }
}

break;

case 'gval':
unset(d,'j');
$.each(d, function(k,v) {
});
break;
case 'updateqinfo':
updateqinfo();
break;

case 'pointerlinkgo':
try{
switch(d['fn']){
case 'b':
$pointerlink=$pointerlink.prev();
break;
case 'd':
break;
case 'n':
$pointerlink=$pointerlink.next();
break;
}

$('.pointerlinkF').removeClass('pointerlinkF');
$pointerlink.addClass('pointerlinkF');
var dpr=$pointerlink.data('dpr');
var $oj=cpr($t,'.gpage').find('.callq');
if(isfound($oj)){
    $oj.attr('data-dpr',dpr).click();
}

}catch(err){}
break;

case 'pointerlink':
$pointerlink=$t;
var $oj=cpr($t,'.gpage').find('.pointerlink');
if(isfound($oj)){
	$oj.click();
}
$('.pointerlinkF').removeClass('pointerlinkF');
$pointerlink.addClass('pointerlinkF');
break;
case 'imgurl':
$t.parent().find('img').attr('src',$t.val());
break;
case 'gremove':
   removeeffect($gselect,100);
break;
case 'gselect':
$gselect=cpr($t,d['g']);
break;
case 'bodyrestore':
/*setTimeout(function(){
$('body').css('overflow','auto');
},10);*/
break;
case 'loadpagenum':
try {
	
$t.parent().find('.cpagenum').removeClass('cpagenumF');
$t.addClass('cpagenumF');
var n=d['n'];
var $g=cpr($t,'.dbgroup')
if($g.data('isload')!='true'){
var $oj=$g.find('#loadpage'+n);

    //$g.find('.cpage:not(.pagehide)').addClass('pagehide');
	$g.data('isload','true');
    $oj.click();
	$oj.parent().removeClass('pagehide');
}

}catch(err){ showmsg('loadpagenum.error'+err);}
break;

case 'loadpagenext':
try{
var $g=cpr($t,'.dbgroup');
var $oj=$g.find('.cpagenumF').next();
if(isfound($oj)){
 $oj.click();
 var h='<div class="loadmorestatus"><img src="img/loadmore.gif" /></div>';
 $g.append(h);;
}else {
}
}catch(err){showmsg('loadpagenuext.error'+err);}
break;
case 'loadpageend':
try{
var $g=cpr($t,'.dbgroup');
$g.find('.loadmorestatus').remove();
$g.data('isload','');
}catch(err){showmsg();}
break;
case 'loadpage':
try{
var $g=cpr($t,'.dbgroup');
var $p=$g.find('[data-pageid="'+cstr($t.data('pagenum'))+'"]');
}catch(err){showmsg('loadpage.error'+err);}
break;

case 'ojinit':
try{
var $oj=cpr($t,d['g']);
if(isfound($oj)){
  $oj.data('isbind','r');
  initall($oj,function(){});
}
}catch(err){showmsg('ojinit.error'+err);}
break;
case 'appendh':
try{
var $oj=getoj($t,d);
if(isfound($oj)){
 $oj.append($t.html());
}else {
}
}catch(err){showmsg('appendh.error'+err);}
break;

case 'jremove':
var $oj=getoj($t,d);
if(isfound($oj)){
	$oj.remove();
}
break;
case 'tremove':
try{
$t.remove();
}catch(err){jremove('tremove.error'+err);}
break;
	

case 'msg':
try {
alert(d['msg']);
}catch(err){}
break;

case 'saveurl':
gurlold=location.hash;
break;
case  'sysval_del':
try {
 delete [d['v']];
}catch(e){
}
break;
case 'sysval':
try {
 sys[d['v']] =d['d'];
}catch(e){
}
break;
case 'jempty':
try{
var $oj=getoj($t,d);
if(isfound($oj)){
$oj.empty();
}	
}catch(err){}
break;
	
case 'setcfg':
cfg[d['v']]=d['d'];
break;	

case 'pushattr':
var $g=cpr($t,d['g']);
var $ojs=$g.find(d['oj']);
var $oj;
var s='';
var arrt;
var arro;

pushattr($ojs,$t,d['attr']);

break;
case 'promptin':
try{
   var ret = prompt("Get data text",'');
   var $input=$t.parent().find(':input:eq(0)');
       $input.val(ret);
  var $init=$t.parent().find('.promptinit');
  if(isfound($init)){
     $init.click();
  }
  
}catch(err){
}
break;

case 'cactive':
var $g=cpr($t,d['g']);
var c=cstr($g.data('fclass'));
var cg=cstr($g.data('fclassg'));
if(cg!=''){
  $g.find('.'+cg).removeClass(cg);	
  $t.addClass(cg);
}
if(c!=''){
  $g.find('.'+c).removeClass(c);	
  $t.addClass(c);
}

break;

case 'chk2click':
var $oj=$(d['oj']);
var val=cstr($oj.data('isclick'));
if(val==d['val']){
	$oj.data('cclick',cstr(d['cclick']));
	$oj.click();
}else {
	
}
break;
case 'tganimate':

var a1=$t.data('a1');
var a2=$t.data('a2');
var $oj=cpr($t,d['g']);
var cclick=cstr($t.data('cclick'))

if($t.attr('data-isclick')!='true'){
$t.attr('data-isclick','true');
}else{
$t.attr('data-isclick','false');
}

if(cstr(a2)==''){
a2=a1;
$oj.data('state',false);
}

if($oj.data('state')!=true){
 $oj.data('state',true);
 $t.data('state',true);
 clearanimate($oj);
 $oj.animate(a1,400, function(){
	 if(cclick!=''){
       alert(cclick);
	   $t.data('cclick','');

	 }
  });
}else {
 $oj.data('state',false);
 $t.data('state',false);
 clearanimate($oj);
 $oj.animate(a2,400, function(){
    if(cclick!=''){
      alert(cclick);
	  $t.data('cclick','');

	 }							  
 });
}

break;



case 'rowlink':
var $oj=getoj($t,d)
if(d['opr']!='-'){
 $o=$oj.next();
}else{
 $o=$oj.prev();
}
$o=$o.find(d['link']);
ojclick($o);

break;

case 'readrow':

var ifoundlink=false;
var opr=cstr(d['opr']);
var $oj=$('.gridF').find('.datarowF');
var $o;
if(isfound($oj)){
if(opr=='+'){
$o=$oj.next();
}else{
 $o=$oj.prev();
}
if(isfound($o)){
	var $rowlink=$o.find('.ojlink:first');
	if(isfound($rowlink)){
		ojclick($rowlink);
		ifoundlink=true;
		$rowlink.effect("highlight",{'color':'#3AB11E'}, 3000);	
	}else {
printmsg('link found link');
	}
}}
if(!ifoundlink){
printmsg('link found link');
}

break;

case 'rowshift':
var $g=cpr($t,d['g']);
var $oj=$g.find('.datarowF');
var $o;
var c=cstr(d['c']);
var slink;
if(d['opr']!='-'){
 $o=$oj.next();
}else{
 $o=$oj.prev();
}

if(isfound($o)){
	
	/*
	slink=cstr($o.data('link'));
	slink=slink.replace('@t@',gett());
    slink=slink.replace('@fid@',cstr(sys['fid']));
	if(slink!=''){
	 location.hash=slink;
	 $g.find('.datarowF').removeClass('datarowF');
	 $o.addClass('datarowF');
	}else {
	 alert('not found link ');
	}
	*/
	if(c==''){c='rowlink';}
	var $rowlink=$o.find('.'+c+':first');
	ojclick($rowlink);
	
}else {
   alert('Not found  ojnext');
}
break;
case 'activeclass':
try{
if(cstr(d['g'])!=''){
var $g=cpr($t,d['g']);
$g.find('.'+d['oj']+'F').removeClass(d['oj']+'F');
$t.addClass(d['oj']+'F');
}else {
 $('.'+d['oj']+'F').removeClass(d['oj']+'F');
 $t.addClass(d['oj']+'F');
}	

}catch(e1){}
break;
case 'cprn_repclass':
var $g=cpr($t,d['g']);
var $oj=$g.find('.'+d['c1']);
    $oj.removeClass(d['c1']).addClass(d['c2']);;
break;
case 'cprinit':
var $g=cpr($t,d['g']);
$g.data('rebind','r');
initall($g,function(){
});
break;

case 'jurl':
unset(d,'j');
var h=cstr(location.hash.split('?')[1]);
var fc='?';
var i=0;
var hx='';
var isfirst=true;
var d1=url2arr(h);
$.each(d, function(k,v) {
 d1[k]=v;				   
});

$.each(d1, function(k,v) {
	if(isfirst){
	   isfirst=false;
	   hx+='?'+k+'='+v;				
	}else{
	   hx+='&'+k+'='+v;				
    }				
});

location.hash=location.hash.split('?')[0]+hx;

break;
case 'pushurl':
var $oj=getoj($t,d);
if(isfound($oj)){
var href=cstr($oj.attr('href'));
if(href!=''){
	
var a1=href.split('?')[1];
var urla=href.split('?')[0];
var dx=url2arr($t.data('pushurl'));
var d2=url2arr('&'+a1);


$.each(dx, function(k,v) {
 if( k in d2 ) {
 }else {
  d2[k]=v;
 }
});

location.hash=urla+'?'+lcut(arr2url(d2));

}}
break;
case 'urlset':
location.hash=d['url'];
gurl=location.hash;
break;

case 'selectrow':
try{
var chk=getcheckbox($t);
var $g=cpr($t,'.ojrow');
if(!isfound($g)){
$g=cpr($t,'.datarow');
}
if(chk){
 $g.addClass('tselectF');
}else {
 $g.removeClass('tselectF');
}
$('.ntselectF').text($('.tselectF').length);

}catch(ex){}
break;
	
case 'chk2class':
try{
var chk=getcheckbox($t);
var $g=cpr($t,d['g']);
var $oj=$g.find(d['oj']);
var y=d['y'];
$oj.removeClass(y);
if(chk){
  $oj.addClass(y);
}
$g.find('.ojcheck').prop('checked', chk);   
}catch(ex){}
break;

case 'parentshow':
var $oj=$t.find(d['oj']);
if(isfound($oj)){
	$oj.show();
}
break;


case 'openexppanel':

$tx=$t.parent();
var c=d['oj'];
var $oj=$tx.find(d['oj']);
if(isfound($oj)){
	var cssdisplay=$oj.css('display');
	if(cssdisplay=='none'){
		$oj.show();
var ojcheck=cstr(d['ojcheck']);
    ojcheck=cnum($tx.find(ojcheck).html());
if(ojcheck!='0'){
var ojcall=cstr(d['ojcall']);
var $ojcall=$tx.find(ojcall);
  if(isfound($ojcall)){
	$ojcall.click();
   }
}	
}else {
$oj.hide();
}
$(d['oj']).not($oj).hide();
}

break;
case 'ctrl_expand':
var $g=cpr($t,'.ctrl_expandg');
var $oj=$t.parent().find('> *:eq(1)');

if(isfound($g)){
	$g.find('.isexpand:first').not($t).click();
}


	if(isfound($oj)){
    $t.removeClass('isexpand');
    if($oj.css('display')=='none'){
	   $oj.find('.ctrl_expandinit0').click();
	   $oj.find('.ctrl_expandinit0').removeClass('ctrl_expandinit0');
	   $t.addClass('isexpand');
	}else {
	  $t.removeClass('isexpand');
	}	
	  $oj.slideToggle(400);
	}



break;
case 'jtoggle':
var $oj=getoj($t,d);
var c=cstr(d['initopen']);
var cc=cstr(d['cclass']);
var k=cstr(d['k'])
var $ojc;
var delay=0;

if('delay' in d){
delay=cint(d['delay']);
}
if(isfound($oj)){
	if(k!=''){
		 $ojc=$oj.find(c);
		if($oj.attr(k)!=$t.attr(k)){
	     $oj.slideToggle(delay);
			$ojc.removeClass('initopenF');
		}else {
	     $oj.slideToggle(delay);
		}
		$oj.attr(k,$t.attr(k));
	}else {
	$oj.slideToggle(delay);
	}
	
	if(cstr($oj.css('display'))!='none'){
		 $ojc=$oj.find(c);
		if(!$ojc.hasClass('initopenF')){
			$ojc.addClass('initopenF');
	        $ojc.click();
		}
	}
	
	
	if(cc!=''){
	    $(cc).not($oj).hide();
	}
}
break;

case 'cprtg':
$tx=cpr($t,d['g']);
var $oj=$tx.find(d['oj']);
if(isfound($oj)){
	$oj.slideToggle(400);
}
break;
case 'cparenttg':
$tx=$t.parent();
var $oj=$tx.find(d['oj']);
if(isfound($oj)){
	$oj.slideToggle(400);
}
break;
case 'cparenttg2':
var $tx=$t.parent();
if(cstr(d['g'])!=''){
$tx=cpr($t,d['g']);
}
var $oj=$tx.find(d['oj']);
var $an=$(d['oj']).not($oj).hide();
var $init=$tx.find(d['oj']+'_init0');

if(isfound($oj)){
	
if($oj.css('display')=='none'){
if(isfound($init)){
 $init.click();
}}	

$oj.slideToggle(0);
}
break;
case 'cprtoggle':
var $oj=getoj($t,d);
if(isfound($oj)){
	$oj.toggle();
}
break;

case 'tgclass':
var c=d['c'];
var $oj=getoj($t,d);
if(!$oj.hasClass(c)){
   $oj.addClass(c);
}else {
  $oj.removeClass(c);
}
break;
case 'initbody':
	$(window).scrollTop(0);
	updateresize();
break;
case 'pscroll':
var $ojold=$('.ojpageF');
var $g=cpr($t,'.pscrollg');
    $g.find('> div > div.ojpage').addClass('ojpagehide').removeClass('ojpageF');
	$g.find('> div > div.ojpage  .pageheadF').removeClass('pageheadF');
var $oj=$g.find('> div > div.ojpage').eq(d['val']);
    $oj.removeClass('ojpagehide');
	
	
if(isfound($ojold)){
	
var yscroll= $('body').scrollTop();
	//alert('save '+yscroll);
	$ojold.data('yscroll',yscroll);
}

if(isfound($oj)){
	$(window).scrollTop(0);
	 $('.pagefooterF').removeClass('pagefooterF');
	 
	 $g.addClass('pagetr');
	 $g.scrollTo( $oj, { duration:'fast',axis:'x',onAfter:function(){
		 
		 
		 $('.ojpageF').removeClass('ojpageF');	
		 $('.pageheadFIX').removeClass('pageheadFIX');
													   
																   
																   
																   
																   
			      $oj.addClass('ojpageF');													   
																   
	var yscroll=cstr($oj.data('yscroll'));	
	if(yscroll!=''){
		//alert('restore'+yscroll);
	 //	$(window).scrollTop(cint(yscroll));
	}
	
							
						 $g.removeClass('pagetr');

							
		
		 
		 
		 $oj.find('> .pagehead').addClass('pageheadF').addClass('pageheadFIX');
		 
		 $oj.find('.pagefooter').addClass('pagefooterF');
		 var $pageinit=$oj.find('.pageinit');
		 var $pageinit1=$oj.find('.pageinit1');
		 var $pageinitclick=$oj.find('.pageinitclick');
		 if(isfound($pageinitclick)){
		   $pageinitclick.click();
		   $pageinitclick.removeClass('pageinitclick');
		 }
		 
		 
		 
		 if(isfound($pageinit)){
			 setTimeout(function(){
			 $pageinit.click();
			 },10);
		 }
		 
		 if(isfound($pageinit1)){
			 if($pageinit1.data('pageinit1')!=true){
			     $pageinit1.data('pageinit1',true);
				 setTimeout(function(){
			     $pageinit1.click();
			     },10);
			 }
		 }
		 
		 
		 
	 }});
}else {
alert('not found');
}

break;


case 'jpage':
var $g=cpr($t,'.pageg');
var $ojh=$g.find('.ojpage:not(:hidden)');
var $oj=$g.find(d['jpage']);
 $ojh.hide();
 var yscroll= $(window).scrollTop();
 $ojh.data('yscroll',yscroll);

if(d['jpage']>cstr($g.data('jpage'))){
	
	$oj.show();
	$oj.css('left','10px');
	$oj.animate({'left':'0'},'slow', function(){});
}else {
	$oj.show();
	$oj.css('left','-20px');
	$oj.animate({'left':'0'},'slow', function(){});
}

$(window).scrollTop($oj.data('yscroll'));
$g.data('jpage',d['jpage']);	


	
break;

case 'adcall':
try {
android.adcall(d['v'],d['d']);

}catch(err){
}
break;

case 'mbfullsc':
if(d['set']=='true'){
  yscroll= $(window).scrollTop();
  $('#program').addClass('fullscmode');
  $(window).scrollTop(0);
}else {
  $('#program').removeClass('fullscmode');
  $(window).scrollTop(yscroll);
 
}
break;

case 'jmenu':

var $p=$('#manupanel');
	$('#panelmtab').show();
    $p.slideToggle('fast');
var $init=$(d['init']);
if(isfound($init)){
	$init.click();
}


//&oj=#panelc
break;


case 'jmenuexp':
try { 
var $p=$('#manupanel');
	if($p.css('display')!='none'){
	  ('#panelmtab').hide();
	}else {
	   $('#panelmtab').hide();
	 }
    $p.slideToggle('fast');
	
	try {
	  //  android.showToast("hello from web...");
	}catch(err){
	}

}catch(err){
}

//&oj=#panelc
break;


case 'mselectpage':
try { 
$('.mexppanel').click();
var init=d['init'];

var $oj=$(d['init']);
if(isfound($oj)){
	$oj.click();
}
var $ojtab=$(d['ojtab']);
if(isfound($ojtab)){
      $('.hmax').height($ojtab.outerHeight());
   
}

$mscroll2.refresh();
}catch(err){}
break;
case 'mpanel':
  $m=cpr($t,'.mpanel');
  if(!$m.data('isopen')){
  $m.animate({'left':'0'},200, function(){ 
      $m.data('isopen',true);
	  $m.addClass('mpanelF');
	  $m.css('position','');
	  $('#backpanel').hide();
   });
  }else {
	  $('#backpanel').show();
	  	  $m.css('position','fixed');

  $m.animate({'left':'75%'},200, function(){ 
      $m.data('isopen',false);	
	  $m.removeClass('mpanelF');
	  
   });
  }
  

break;

case 'jcal':
var $g=cpr($t,'.jcalg');
if(isfound($g)){

var $oj;
var calunitprice=0;
var calqty=0;
var calsumprice=0;
var calsumtotalprice=0;
var caltotalcharge=0;
var caltotalqty=0;
var calbcharge=0;

$g.find('.calitem').each(function(){
$oj=$(this);
calunitprice=cint($oj.find('.calunitprice').html());
calqty=cint($oj.find('.calqty').val());

calsumprice=calunitprice*calqty;

caltotalqty+=calqty;
calsumtotalprice+=calsumprice;

$oj.find('.calsumprice').html(calsumprice);

});

$g.find('.calsumtotalprice').html(calsumtotalprice);

calbcharge=cint($g.find('.calbcharge').html());
caltotalcharge=calsumtotalprice+calbcharge;


$g.find('.caltotalcharge').html(caltotalcharge);
$g.find('.caltotalqty').html(caltotalqty);

		
}
break;


case 'rmclass':
try{
$(d['oj']).removeClass(d['v']);
}catch(err){
}
break
case 'updatememberinfo':
updatememberinfo();
break;
case 'cprnanimate':
try {
var $oj=cprfind($t,d['g'],d['oj']);
var ani=cstr($t.attr('data-on'));
  var a=JSON.parse(ani);
   alert(a);
if(isfound($oj)){
    $oj.animate(a,100, function(){ 
	});
}

}catch(err){
  alert('cpranimate.errror.'+err);
}
break;

case 'clink':
var  $oj;
var reqattr='';

if(cstr(d['g'])!=''){
$oj=getoj($t,d);
}else {
$oj=$(d['oj']);
}
if(isfound($oj)){
$oj.each(function(){
  $tx=$(this);
  reqattr=cstr($tx.attr('data-reqattr'));
  if(reqattr!=''){
    $tx.attr(reqattr,$t.attr(reqattr));
  }
  $tx.click();
});
}
break;

case 'qlink':
try { 

var $g=cpr($t,'.linkg');
var $oj=$g.find('.linkoj');
var dpr=cstr(d['qlink']);

if(cstr(d['oj'])!=''){
   $oj=$g.find(d['oj']);
}
if(dpr==''){
    dpr='data-ppr';
}

if(isfound($oj)){
	var $tx;
	var idelay=0;
	 $oj.each(function(){
	$tx=$(this);
	
	if(!$tx.hasClass('nullqlink')){
       $tx.attr(dpr,$t.attr(dpr));
	   idelay=cint($tx.data('delay'));
	   
	   if($tx.hasClass('pagereq')){
	            $tx.addClass('pageinitclick');
	   }else {
				delaytrigger($tx,'click',idelay);	   
				delaytrigger($tx,'mousedown',idelay);		   
	   }
	  }
	 });
	
}else {
alert('qlink.error.notfound .linkoj');
}
}catch(err){
alert('qlink.error.'+err);	
}
break;

case 'phide':

var $g=$t.parent();
var $oj=$g.find(d['oj']);
var $o=$(d['oj']);
$o.hide();
$oj.show();

break;

case 'cropimg':
var $g=cpr($t,'.gpage');
var $ojbox=$g.find('.ojbox');
var $ojcrop=$g.find('.ojcrop');
var arr={};
if(isfound($ojbox)&&isfound($ojcrop)){
	
arr['w']=$ojcrop.width();
arr['h']=$ojcrop.height();
arr['l']=$ojcrop.position().left;
arr['t']=$ojcrop.position().top;
arr['src']=$ojbox.find('.ojimg').attr('src');
arr['fn']=cstr($t.attr('data-fn'));


var f='cropimg.php';
var pr={};
pr['crop']=arr;
doajax(null,f,pr,function(r){
						  
          rpost($t,r);
var $img=$('.uimg_profile');
var src=$img.attr('src');
var src2= src + "?timestamp="  + new Date().getTime();
    $img.attr('src',src2);
		  
});
	



}

break;
case 'openrmemu':
break;
	
case 'readalert':

var   k=cstr(d['k']);
var   $xb=$('#xbox');
var $oj=$xb.find('.'+k);

try{
$('.ojpanelexp').hide();}catch(errr){}

if(isfound($oj)){
   $oj.trigger('mousedown');
   $oj.click();
  }
if($xb.data('isopen')!=true){
    $xb.animate({'margin-left':'-320px'},200, function(){ 
        $xb.data('isopen',true)
	});
}else {

}

$xb.data('k',k);
break;



case 'setvalex':
var $p=cprfind($t,d['g'],d['oj']);
if(isfound($p)){
valex= $.parseJSON($p.html());
}
case 'setvalexattr':

var $p=cprfind($t,d['g'],d['oj']);
if(isfound($p)){
valex=cstr($p.attr(d['attr']));
}

break;
case 'checkcmd':
try { 

var fn=d['fn'];
switch(fn){
	
case 'tselect':

var $g=cpr($t,d['g']);
if(isfound($g)){
  var $p=$g.find(d['oj']);
  if(getcheckbox($t)){
   $p.addClass('tselectF');
  }else {
   $p.removeClass('tselectF');
  }	 
 }
break;
}


}catch(err){
  alert(err);
}
break;



case 'movelist':
var v=d['v'];
var $g=cpr($t,d['g']);
var $lfrom=$g.find('.listfrom');
var $lto=$g.find('.listto');

if(v=='send'){
	$lfrom.find('.tselectF').each(function(){
	   $lto.append($(this));
	   clearclass($lto,'tselectF');
	 });

}else {
    $lto.find('.tselectF').each(function(){
	   $lfrom.append($(this));
	   clearclass($lfrom,'tselectF');
	 });
}
break;

case 'qstore':

if($t.data('issuccess')!=true){
	
var $p=cpr($t,'.qqbox').find('.qqpanel');
var $qstore=$('#querystore');
var ppr=$t.attr('data-ppr');
if(!isfound($qstore)){
 $('body').append('<div id="querystore"></div>');
  $qstore=$('#querystore'); 
}
var $q=$qstore.find('[data-ppr="'+ppr+'"]');
if(!isfound($q)){
   $qstore.append('<div class="q" ></div>');
 var $q=$qstore.find('.q:last');
     $q.attr('data-ppr',ppr);
	   var pr=ppr
	   $q.load('ss/qq.php',pr, function(r, status, xhr){
	     $p.html($q.html());
          initall($p.parent(),function(){ });
		   $t.data('issuccess',true);
		   $t.removeClass('init1');
	   });
}else {
	   $p.html($q.html());
       initall($p.parent(),function(){ });
	   $t.data('issuccess',true);
}

}




break;
case 'datagrid':

$tb=$('#datagrid');


var html = '';
for (var key=0; key<10000; key++) {

  html += '<tr><td>'
             + key
             + '</td><td class="whatever1">'
             + 'yyy'
             + '</td><td class="whatever2">'
             + 'xx'
             + '</td></tr>';
}
$tb.html('');
$tb.append(html);


break;

case 'tbpost':
try {
var $tb=cpr($t,'.dbgroup').find('.grid');

var $tr;
var name='';
var val='';
var $oj;
var dr={};
var drs={};
var requpdate=false;
$tb.find('tr').each(function(){
$tr=$(this);

dr={};

requpdate=false;
$tr.find('input').each(function(){
$oj=$(this);
if($oj.hasClass('txtrequpdate')){
requpdate=true;	
name=cstr($oj.attr('name'));
if(name!=''){
  val=$oj.val();	
  dr[name]=val;	
}
}



});


// get rows is update only
if(requpdate){
drs[cstr($tr.attr('data-rowid'))]=dr;
}



});
var pr=getparameter($t);//+dpr;	
    pr['rows']=drs;
	var f='ss/tbpost.php';
doajax(null,f,pr,function(r){
 alert('return r'+r);
});




	
}catch(err){alert('tbpost.error.'+err);}
break;
case 'chk2select':
var chk=getcheckbox($t);
alert(chk);
break;
case 'topscroll':
try{
clearanimate($('body'));
topscroll($('body'),100);
}catch(err){}
break;
case 'pval':
   pval[d['v']]=d['d'];
break;
case 'addojlist':

var $p=cprfind($t,d['g'],d['oj']);
if(isfound($p)){
var h=gettemplate('.ulist');
    h=h.replace(/@fid@/g,cstr($t.attr('data-fid')));
    h=h.replace(/@aname@/g,cstr($t.attr('data-aname')));
  $p.prepend(h);
  cpr($t,'.ojitem').remove();
}else {
}
break;

case 'test':
alert('call test  => '+ojhtml($t));
break;

case 'confirm':
try {
var v=d['v'];
var $b=$('#confirmboxw');
    $b.hide();
    $b.attr('data-ischeck',true)
	$b.attr('data-ret',v)
   $ojeclick.click();
}catch(err){
}

break;

case 'ojdel':
$t.remove();
break;

case 'cprnattr':
var $oj=cprfind($t,d['g'],d['oj']);
if(isfound($oj)){
   $oj.attr(d['attr'],$t.attr(d['attr']));
}
break;

case 'home':
qwall(loginid);
break;

case 'openxbox':

var $x=$('#xboxcontrol');
var $xb=$('#xbox');
if($x.data('state')!=true){
$x.click();
}
var arr=cstr(d['init']).split(',');
var $oj;
$.each(arr, function(k,v) {
 $oj=$xb.find(v);
if(isfound($oj)){
 $oj.attr('data-ppr',$t.attr('data-ppr'));	
 setTimeout(function(){
  $oj.trigger('mousedown').click();
 },0);
}					 
})

break;
case 'togglexbox':
togglexbox();
break;
case 'elogclick':


var v=cstr(elog[d['v']]);
var d=d['d'];
    d=d.replace(/@61@/g,'=');
	d=d.replace(/@d@/g,v);


if(v!=''){
 var $oj=$(d);
if(isfound($oj)){
    $oj.click();
 }
}


break;


case 'elog':
try{
elog[d['v']]=d['d'];
}catch(err){};
break;
	
case 'replaceattr':
try {

var arr = {};
$.each($t[0].attributes, function() {
        if(this.specified) {
		  arr[this.name]=this.value
        }
});
$.each(arr, function(k,v) {
     //  alert(k+v);
});

}catch(err){
}
break;

case 'expanelmenu':

try {
	
var $p=$('#xbox');
var $init=$p.find('.init');
	 $init.attr('data-dpr',$t.attr('data-dpr'));
	 $init.click();
	 $('.initexpanelmenu').trigger('mousedown');
	 
if($p.data('isopen')!=true){
	 $('._callxboxshow').click();
}	 



$p.addClass('invisit');
setTimeout(function(){
$p.removeClass('invisit');
},500);
}catch(err){
}
break;
	
case 'cprnval':
var $oj=getoj(d);
if(isfound($oj)){
 $oj.val(d['v']);
}
break;
	
case '1start':
var  $oj=$(d['oj']+':first');
if($oj.data('is1start')!=true){
   $(d['oj']).data('is1start',true);
   $(d['oj']).click();
}
break;

case 'pageback':
var $oj=$t.parent().find('.pagenumF');
if(isfound($oj)){
   $oj=$oj.prev();
   if(isfound($oj)){
	 $oj.click();  
  }
}
break;
case 'pagenext':
var $oj=$t.parent().find('.pagenumF');
if(isfound($oj)){
   $oj=$oj.next();
  if(isfound($oj)){
	 $oj.click();  
  }
}
break;
	
case 'cprselect':
if(cstr(d['oj'])!=''){
 $cprselect=cpr($t,d['oj']);
}
if(cstr(d['g'])!=''){
 $cprselect=cpr($t,d['g']);
}


break;
	
case 'addclass':
var $oj=getoj($t,d);
if(isfound($oj)){
   $oj.addClass(d['name']);
}
break;
case 'ojlist':
var s='';
cpr($t,d['g']).find(d['oj']).each(function(){
s+=$(this).attr(d['attr'])+',';										   
});
if(s !=''){
 s=rcut(s);
}
if(cstr(d['ojval']) !=''){
 cpr($t,d['g']).find(d['ojval']).val(s);
}
break;
// c 

case 'hidetoggle':
var $o=$(d['oj']);
if($o.css('display')!='none'){
if(isfound($o)){
	setTimeout(function(){
    $o.slideToggle(200);
	},400);
}	
}
break;

case 'jcmd':
try {
var $o=$('.sectionb');
}catch(err){
alert('scrollto error'+err);
}
break;


case 'callcmd':
try { 

if(d['oj']=='msgin'){
var $appchat=$('#appchat');	
var state=cstr($appchat.attr('data-state'));

$('#ctrl-callchat').click();
$('#paneltopq').hide();

if(state!='on'){
   var $poj=$('#panelmsgin');
      $poj.show();
	  $poj.effect("highlight",{'color':'#3AB11E'}, 3000);
     $('.cmd_readmsgin').click();

}

}
}catch(err){}
break;

case 'showtoggle':

var $o=$(d['oj']);
if($o.css('display')=='none'){
if(isfound($o)){
    $o.slideToggle();
}	
}
break;

case 'jtoggle':
var $o=$(d['oj']);
if(isfound($o)){
    $o.slideToggle(1);
}
break;

case 'ojhide':
alert('call ojhide');
var $oj=getoj($t,d);
if(isfound($oj)){
	$oj.hide();
}
updatebodyscroll();
break;
case 'ojshow':
var $oj=getoj($t,d);
if(isfound($oj)){
	$oj.show();
	initcontrolui($oj);
}
break;

case 'jtoggle2':
var $o=$(d['oj']);
var k=d['k'];
if(isfound($o)){
    if(ojishide($o)){
		$o.slideToggle(200);
	}else {
		$o.hide();
	}
}
break;


case 'cprn_tgshow':
var $o=getoj($t,d);
if(isfound($o)){
if($o.css('display')=='none'){
$o.show();
}else {
$o.hide();
}
}
break;


case 'jhide':
var $g=cpr($t,d['oj']);
if(isfound($g)){
   $g.hide();
   updatebodyscroll();
}
break;
case 'cprempty':
 cpr($t,d['oj']).empty();
 updatebodyscroll();
 break;
case 'jempty':
 cpr($t,d['g']).find(d['oj']).empty();
 updatebodyscroll();
break;
case 'cprn_remove':
 var $oj=getoj($t,d);
 if(isfound($oj)){
 removeeffect($oj,100);
}
break;
case 'clearhtml':
 cprfind($t,d['g'],d['oj']).html('');
 updatebodyscroll();
break;
case 'cprremove':
 cpr($t,d['oj']).remove();
 updatebodyscroll();
break;
case 'cprclearval':
cpr($t,d['g']).find('.clearval').val('');
break;

case 'cprmove':
var $g=cpr($t,d['g']);
if(d['cssname']=='margin-left'){
var v	=d['cssval'];
if(v=='-$t'){
  v='-'+$g.width()+"px";
}	
 $g.animate({"margin-left": v},400, function(){});
}
break;


case 'setattr':
var $oj=getoj($t,d);
var attr=d['attr'];
if(isfound($oj)){
	$oj.attr(attr,$t.attr(d['attr']));
	if(attr='text'){
		$oj.text(cstr(d['d']));
	}
	if(attr='val'){
		$oj.val(cstr(d['d']));
	}
	if(attr='html'){
		$oj.html(cstr(d['d']));
	}
}

break;

case 'setval':
var $ojj=getoj($t,d);
if(isfound($ojj)){
$ojj.val(d['val']);
}
break;

case 'setmode':
switch(d['v']){
case 'desktop':
//$('body').css('overflow','auto');
break;
case 'fullsc':
//$('body').css('overflow','hidden');
break;
}
break;


// p

case 'playoj':
try { 


var h=gettemplate('.playyoutube');
    h=h.replace(/@v@/g,d['v']);
	$t.parent().html(h);

}catch(err){
  alert('playoj.error.'+err);
}
break;


case 'plink':
try{
	
var $g=cpr($t,d['g']);
var $ojj;
var plink=cstr(d['plink']);
if(isfound($g)){
 $ojj=$g.find(d['oj']);	
}else {
 $ojj=$(d['oj']);	
}


if(isfound($ojj)){
	if(cstr(d['plink'])!=''){
	  $ojj.removeClass('bypage');
	  if(plink!=''){
	   $ojj.attr(plink,cstr($t.attr(plink)));
	  }
	}
    if(isfound($ojj)){
	    $ojj.click();
	}
	
}

	
}
catch(err){
	alert('plink error'+err);
}



break;
case 'jlink':
try {
	
	

var $g=cpr($t,d['g']);
var $ojj;
var req='';
var reqv='';
var arr;
var dpr=url2arr($t.data('dpr'));
var dpr2;
var dpr3;
var s='';


if(isfound($g)){
$ojj=$g.find(d['oj']);	
}else {
$ojj=$(d['oj']);	
}

if(isfound($ojj)){
	// set attrib	
$ojj.each(function(){
req=cstr($(this).data('req'));
reqv=cstr($(this).data('reqv'));

if(reqv!=''){
$(this).val(cstr(dpr[reqv]));
}


if(req!=''){
arr=url2arr(req);
$.each(arr,function( k, v ) {
dpr2=v.split(',');
dpr3=url2arr($ojj.attr(k));
$.each(dpr2,function( k2, v2 ) {
	if(v2 !=''){
	   dpr3[v2]=dpr[v2];
	}			 
});



// convert array to string parameter
$.each(dpr3,function( k3, v3 ) {
  s+='&'+k3+'='+v3;
});
$ojj.attr(k,s);
});	
}
});




$ojj.each(function(){
		if(cstr($(this).data('ev'))!=''){
			if($(this).data('ev')=='c'){
		      $(this).click();
		    }else {
		      $(this).trigger($(this).data('ev'));
			}
		}			
	 });
}
}catch(err){ alert('jlink error:'+err);}
break;
case 'ddl':
try { 

var $g;
var $ojt;

if(cstr(d['g'])!=''){
$g=cpr($t,d['g']);
}
if(isfound($g)){
 $ojt=$g.find(d['oj']);
}else {
 $ojt=$(d['oj']);
}
if(isfound($ojt)){
 $ojt.attr('data-ppr',$t.attr('data-ppr'));
 if(cstr($ojt.data('ev')) != ''){
    $ojt.trigger(cstr($ojt.data('ev')));
  }
}

}catch(err){alert('ddl error'+err);}

break;
case 'selectall':
var chk=$t.is(':checked');
var $g=cpr($t,d['g']);
var $oj=$g.find(d['oj']);

 $g.find('.ojcheck').prop('checked', chk);
if(chk){
 $g.find(d['oj']).addClass('tselectF');
}else {
 $g.find(d['oj']).removeClass('tselectF');
}	
$('.ntselectF').text($('.tselectF').length);
	
break;

case 'jsetclass':
var $oj=getoj($t,d);
if(isfound($oj)){
if(cstr(d['r'])!=''){
$oj.removeClass(d['r']);
}	
$oj.addClass(d['c']);
}
break;
case 'setclass':
try { 

var $g=cpr($t,d['g']);
if(cstr(d['oj']) !=  '' ){
   $g=cprfind($t,d['g'],d['oj']);
}

var s=cstr($g.data('inf'));
if(s!=''){
 var pr=str2pr(s);
 var prs=pr['v'].split(',');
  $.each(prs, function( key, vclass ) {
     $g.removeClass(vclass);
  });
 $g.addClass(d['v']);
}
}catch(err){
 alert('setclass error'+err);
}

break;
case 'hide':
$(d['oj']).hide(d['option']);
break;
case 'show':
$(d['oj']).hide(d['option']);
break;

case 'toggle':
$(d['oj']).hide(d['option']);
break;
case 'iftrigger':
var $oj=$(d['oj']);
var $ctrl=$(d['ctrl']);
if(cstr($oj.data('state'))!='on'){
     $ctrl.click();
}else {

}
$oj.find('.'+d['k']+'_ev_md').trigger('mousedown');
$oj.data('k',d['k']);
break;
case 'ojclick':
var $oj=getoj($t,d);
if(isfound($oj)){
 $oj.click();
 $oj.trigger('mousedown');
}else {
 alert('not found ojclick'+d['oj']);
}
break;
case 'ojlink':
try {
	
var $x;
var $g;
var reqattr='';
var ojselect='';
if(cstr(d['g'])!=''){
$g=cpr($t,d['g']);	
}

var v=cstr(d['oj']).split(',');
for(var i = 0; i < v.length; i++){
ojselect=cstr(cstr(v[i]));	
if(isfound($g)){
	
	
$x=$g.find(ojselect);
}else {
$x=$(ojselect);
}	



if(isfound($x)){
var $xall=$x;	
$xall.each(function(){
$x=$(this);
var reqval=cstr($x.data('reqval'));
if(reqval!=''){
	$x.val($t.attr(reqval));
}
reqattr=cstr($x.data('reqattr'));
if(cstr(reqattr) != '' ){
try{
	
var arr=reqattr.split(',');
var a='';
var b='';
var s='';
$.each(arr,function( key,value ){
	value=value.split('.');	
	a=cstr($t.attr(value[0]));
	if(a!=''){
		b=cstr($x.attr(value[0]));
		s=sumurl(b,a);
		if(cstr(s) != ''){
		$x.attr(value[0],s);
		}else{
		$x.attr(value[0],a);
		}
	}
	
});
}catch(ex){
 alert('callpchat.error '+ex);
}
}      
$x.trigger('mousedown');
$x.click();


});	
	
	
		
	


}
}

}catch(err){
alert('ojlink.err'+err);
}


break;
case 'cprnclass':
var $g=cpr($t,d['g']);
if(isfound($g)){
var $oj=$g.find('div:eq(0)');
if(isfound($oj)){
	$oj.attr('Class',d['v']);
}
}
break;
case 'cprnclick':
try {
var $oj=cprfind($t,d['g'],d['oj']);
if(isfound($oj)){
    $oj.click();
}
}catch(err){}
break;

case 'cprclick':
try {
var $g=cpr($t,d['g']);
if(isfound($g)){
    $g.click();
}
}catch(err){}
break;

case 'tg':
try { 
if(cstr(d['g'])!=''){
 var $ojc= getoj($t,d); 
 if(isfound($ojc)){
 if(cstr(d['ev'])==''){
   d['ev']='click';
  }	
  $ojc.trigger(d['ev']);
}else { alert('not found object ');}
}else {
	
	
if(cstr(d['ev'])==''){
  d['ev']='click';
}
 var $ojj= $(d['oj']);
 if(isfound($ojj)){
    $ojj.trigger(d['ev']);
 }
}
}catch(err){}
break;


default:
try{
jscmd($t);
}catch(errx){}
break;


}
}

try{
initeventex($fm_);	
}catch(exx){}
iinitevent($fm_,function(){
callback();
});
}
