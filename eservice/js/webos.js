var winx;
var winy;
var webosstart=false;

var gdb={};
var valex={};
var gstate={};
var gurl='';
var gurlold='';
var gurlload=false;
var sys={};
var cfg={};
var sval={}; // system value for post
var pval={};
var gval={};
var userinfo={};
var webstore={};
var valstore={};
var cache={};

var _h={};
var g_json='';

var isupdatewebstore=false;


var kseq=0;
var timeseq=0;
var loginid='';
var loginaname='';
var firsttime=false;
var elog={};
var $ojhover;
var hvstate='';
var sound_msgin;
var isfirstchatq=true;
var $obody;
var chatinit=true;
var serverurl='';
var $cprselect=null;
var ischatstart=false;
var ischatconnect=false;
var islogin=false;
var kstate='';
var $ojeclick=null;
var url2go='';

var $qqpanel;
var yscroll=0;
var y_scroll=0;
var urlreq=false;

var $mscroll;
var $mscroll2;
var $pointerlink=null;

var $ojdrop;
var $ojselect=null;
var $gselect=null;
var $ojclick=null;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_DEL= 46;
var KEYCODE_F10= 121;
var KEYCODE_SHIFT=16;
var KEY_YES=89;

var isctrlkey=false;
var isshiftkey=false;
var iurlnode=-1;
var saveurl='';


// global var 
// ใช้เฉพาะงานที่จบใน ตัวเอง 
// งานที่ต่องเนื่องห้ามใช้เพราะทำให้ ตัวแปรผิดพลาดได้ อย่างเช่น setTimeout,หรือใน loop everytime
var i=0;
var s='';
var $g;
var $oj;
var $b;
var $tx;
var val='';
var vname='';
var $pl;
var req_changepr=false;

$(document).keydown(function(e){
	
	
	
switch(e.keyCode)
{
case 8:
var $fo= $(':focus');
if(isfound($fo)){
var tag=$fo[0].tagName.toLowerCase();	
if(tag!='input' && tag!='textarea' ){
     event.preventDefault();
}}else {
     event.preventDefault();
}

break;	  
}
	
	
	
    if(e.ctrlKey) {
        isctrlkey=true
    }
	 if(e.shiftKey ) {
        isshiftkey=true
    }
	
	if (e.ctrlKey || e.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            ojclick($('.savecmd'));
            break;
        case 'f':
            event.preventDefault();
            break;
        case 'g':
            event.preventDefault();
            break;
        }
    }
	
});


$(document).keyup(function(e) {
						   
	isctrlkey=false;					   
	isshiftkey=false;	
	
switch(e.keyCode) {
case KEYCODE_DEL:
$('.ondelkey').click();
break;	
case KEYCODE_ENTER:
break;
case KEYCODE_ESC:
esccmd();
break;
case KEYCODE_LEFT:
ojclick($('.keyboard_back'));
break;
case KEYCODE_RIGHT:
ojclick($('.keyboard_next'));
break;
case KEYCODE_UP:
break;
case KEYCODE_DOWN:
break;
case KEYCODE_F10:
alert('f10cmd');
break;
case KEY_YES:
$('.key_yes:not(:hidden)').click();
break;


}
});

$(window).scroll(function(){
 var $oj=$('.login-aname');
 
 var vtop=$(window).scrollTop();
	 if( vtop >= 50 ){
	   $('.tfix50').addClass('tfix50F');
	 }else {
	  $('.tfix50').removeClass('tfix50F');
	 }
	 



var $oj=$('[data-scrollfix]:not(:hidden)');
var $tx;
var v;
$oj.each(function(){
$tx=$(this);
v=$tx.data('scrollfix').split(',');
if(vtop>=parseInt(v[0])){
	$tx.addClass(v[1]);
}else {
    $tx.removeClass(v[1]);
}
});

// trigger click when bottom click
if($(window).scrollTop() + $(window).height() == $(document).height()) {
	var $oj=$('.bodyfillb:not(:hidden):first');
	if(isfound($oj)){
       $oj.click();
	}
}	 
}); 


$(window).resize(function() {
   updateresize(); 
});

function updateresize(){
	
winy=$(window).height();
winx=$(window).width();



var $l=$('.lmoniter');
var gname='grid10'+cint(winx/10);



$l.html(gname+':'+winx);
$('#bodyq').attr('Class',gname);



try{
var $qoj=$('[data-qresize]');
var $tx;
var d;
var iwidth=0;
$qoj.each(function(){
$tx=$(this);
var d=url2arr($tx.attr('data-qresize'));
var isactive=false;
switch(d['qt']){
case '*':
  isactive=true;
break;	
case '<':
if(winx< parseInt(d['q'])){
   isactive=true;
 }else {
   $tx.width('auto');
}
break;
case '<>':
var v2=d['q'].split(',');
if( winx > parseInt(v2[0]) && winx < parseInt(v2[1]) ){
   isactive=true;
 }else {
   $tx.width('auto');
}
break;


}

if(isactive){
switch(d['action']){
case 'setsize':
 iwidth=winx+parseInt(d['v']);
 $tx.width(iwidth+"px");
break;
case 'switchclass':

var dd=d['v'].split(',');
iwidth=parseInt(dd[1]);
if(winx<iwidth){
$tx.removeClass(dd[2]).addClass(dd[0]);
setTimeout(function(){
  $('.mobile100p').width(winx+'px');
},100);
}else {
$tx.removeClass(dd[0]).addClass(dd[2]);
}
break;

}
}

});
}catch(err){}





var $tx;
var $txp;
var d;
var arr;
var iq=0;
var w;
var v;

$('[data-xycss]').each(function(){
var $t=$(this);	
if(!$t.hasClass('noq')){
var d=cstr($t.data('xycss')).split(',');
if(d[0]!=''){
var winxt=winx-0;	
   $t.width(winxt+parseFloat(d[0]));
}
if(d[1]!=''){
   $t.height(winy+parseFloat(d[1]));	
}
}
});



try {
	
$liq=$('[data-qsize]');
$liq.each(function(){
				   
$tx=$(this);
d=url2arr(cstr($tx.data('qsize')));
if("qsize" in d){
var nd=parseFloat(d['qsize']);
 if("classa" in d){
	if(nd <=winx){
		$tx.removeClass(d['classa']).addClass(d['classb']);
	}else {
		$tx.removeClass(d['classb']).addClass(d['classa']);
	}
 }


}


/*
		v=d['qsize'].split(',');
		v[0]=cint(v[0]);
		v[1]=cint(v[1]);
		if(winx >= v[0] && winx <= v[1]){
			w=$tx.parent().width();
			if(cstr(d['x'])!=''){
				d['x']=parseFloat(d['x']);
				w=w+d['x'];
				$tx.width(w);
			}
		}
*/
});

}catch(err){
}




$oj=$('[data-mediaquery]');
var cclass='';
$oj.each(function(){
$tx=$(this);
arr=url2arr(cstr($tx.data('mediaquery')));
$.each(arr,function( key,value ){
		v=value.split(',');
		v[0]=cint(v[0]);
		v[1]=cint(v[1]);
		if(winx >= v[0] && winx <= v[1]){
		   cclass=key;
		}
$tx.removeClass(key);		
});
$tx.addClass(cclass);
});
}
function stfunction(){
  updateresize();
}


function initstart(){
try {

$obody=$('body');	

try{
sound_msgin = new buzz.sound("/sound/msgin.wav");
}catch(e){}

if(!isfound($('#timer'))){$('body').append('<div  id="timer"/>');}

}catch(err){}
}

function init(){
  winy=$(window).height();
  winx=$(window).width();
  
}
function initall($fm_,callback){
	
if(webosstart==false){
   webosstart=true;
   init();
}

if(isbind($fm_)){
initcontrol($fm_,function(){
initevent($fm_,function(){
initfill($fm_,function(){
	callback();
});
});
});
}else{ callback();}
}


function dbloopup($fm_,callb){
var $p=$fm_.find('.c-dblookup:first');
if(isfound($p)){
var pr={};
pr['q']=str2pr(cstr($p.data('inf')));
pr=$.param(pr);
 $p.load('ss/dblookup.php',pr, function(r, status, xhr){
	$p.addClass('c-dblookupF').removeClass('c-dblookup');						 
	  dbloopup($fm_,callb);
   });
  }
  callb();
}


function dblink($fm_,callb){
var $p=$fm_.find('.c-dblink:first');
if(isfound($p)){
var pr={};
var qv=cstr($p.attr('data-q'));
     
	    try{
	      qv=qv.replace(/@login_id@/g,gdb['login']['mid']);
	      qv=qv.replace(/@aname@/g,gdb['login']['aname']);
		  
		}catch(ex){};
    
	
    pr['q']=url2arr(qv);
	pr['inf']=str2pr(cstr($p.data('inf')));
	
	
	
doajax($p,'ss/dblink.php',pr,function(r){
try{
	
msgbox(r);	
var ojtype='';
var rt = $.parseJSON(r);
var $oj;
var tagname='';


$.each(rt,function( key,value ){
				   
$oj=$p.find('[name="'+key+'"]');
if(isfound($oj)){

 ojtype=cstr($oj[0].type);
 tagname=cstr($oj[0].tagName.toLowerCase());
 
// alert(ojtype+":"+key+":"+value);
switch(ojtype){
case 'select-one':
try {
     $oj.attr('data-setval',value);
     $oj.find("option[value='"+value+"']").attr('selected', 'selected');
}catch(err){}
break;
case 'checkbox':
setcheckbox($oj,value);
break;
default:

// tag fillter
switch(tagname){
case 'a':
 $oj.html(value);
break;
default:
  $oj.val(value);
break;
}


break;
}
  
	
}else {
 $oj=$p.find('[data-name="'+key+'"]');  
if(isfound($oj)){
if($oj.hasClass('arayimg')){
	$oj.empty();
	 $.each(value,function( k2, imgsrc ) {
	    $oj.append('<div class="imgbselect dcol"  ><a class="img-del">x</a><img src="'+imgsrc+'" /></div>');	
	 });

}
} 
}
				   
}); 
}catch(err){};

	     $p.addClass('c-dblinkF').removeClass('c-dblink');
          dblink($fm_,callb);
	});
	
}
callb();
}

// bind database config 
function serial_loadoselect($alloj,i,$fm_){
	  if(i >= $alloj.length){
		   return;
	  }
	  var $x=$alloj[i];
  	  p_loadoselect($x,function(){
		  $x.data('mcheck',true);
	       serial_loadoselect($alloj,i+1,$fm_);
	  });
}

function p_loadoselect($x,docallb){
try {
	
	
   var f  = 'ss/oselect.php';
   var k  = cstr($x.attr('oselect'));
   var dpr  = cstr($x.attr('data-dpr'));
   var q   = cstr($x.attr('data-q'));
   
   var s={};
       s['k']=k;
	    if(q !=''){
	      s['q']=url2arr(q);
		}
	   
   
   var pr =$.param(s);//+dpr;	
   var d=pr+dpr
   
   var ojtype=cstr($x[0].tagName.toLowerCase());
   d+='&ojtype='+ojtype;
   $x.load(f,d, function(r, status, xhr){
						 
		 var v=$x.data('setval');				 
           $x.find("option[value='"+v+"']").attr('selected', 'selected');
		   $x.attr('load_success','true');
		   if ($x.hasClass('cmblink')){
		       $x.trigger('change');				   
		   }
		//initevent($x.parent(),function(){});
		docallb();
   });   
   
}catch(err){alert('p_loadoselect error:'+err);}
}


function initcontrol($fm_,callback){
	
var $ojcenter;
var w;
var h;
var dx;

// setting golbal value
var $initv=$fm_.find('[data-initsval]');
    $initv.each(function(){
          dx=url2arr($(this).data('initsval'));
	      $.each(dx, function(k, v){
			sys[k]=v;
		  });
   
	  // sys[dx['v']] =dx['d'];
	   $(this).removeAttr('data-initsval')
    });
	
	

var hlookup=gettemplate('.lookup');
var dtag;
try{
$('.uilookup',$fm_).each(function(){
	var $t=$(this);
	if(!$t.hasClass('uilookup1')){
		$t.addClass('uilookup1').attr('readonly', true);
		dtag=cstr($t.data('d'));
		$t.parent().addClass('uilookupg');
		$t.parent()
        .append('<a id="openlookuppanel" class="_closelookup" data-a="&j=jtoggle&g=.uilookupg&oj=#lookuppanel&inits=#openlookup">+</a>')
		.append(hlookup);
		$t.parent().find('#openlookup:first').attr('data-dpr',dtag);
		
	}
	$t.unbind('click').bind('click',function(){
	 ojclick($(this).parent().find('#openlookuppanel'));	
	});
});
}catch(e){}



try{
$('.d_bind',$fm_).each(function(){
	var $t=$(this);
    if(!$t.hasClass('isbind')){
	    d_bind($t);
    }
	$t.remove();
});
}catch(e){}

try{
$('.d_map',$fm_).each(function(){
	var $t=$(this);
	d_map($t);
});
}catch(e){}



// bind datarow  
try{
$('.d_data',$fm_).each(function(){
	
	
	var $t=$(this);
	var $p=$t.parent();
	  var t='';
      var r = $.parseJSON($t.text());
         $t.remove();	
		 
		 
	  var tp=cstr(r['tp']);
	  var col=cstr(r['col']).split(',');
	  if(cstr($p.data('tp'))!=''){
	      tp=$p.data('tp');
	  }
	   if(cstr($p.data('col'))!=''){
	      col=cstr($p.data('col')).split(',');
	  }
	  
	  
      // for append section 
	  var d=url2arr(cstr($p.attr('data-inf')));
       if(cstr(d['oj'])!=''){
		 if(cstr(d['g'])!=''){
            var $gx=cpr($t,d['g']);
			    $p=$gx.find(cstr(d['oj']));
		 }   
	       $p=$(cstr(d['oj']));
		   if($p.is("table")){
			   alert('table');
		      $p.find('tbody').empty();
		    }
	  }
	
	  var tg=cstr($p.data('to'));
	  if(tg!=''){
		    tg=url2arr(tg);
			$p=cpr($p,cstr(tg['g'])).find(cstr(tg['oj']));
		 	if($p.is("table")){
		      $p.find('tbody').empty();
			}

	  }
	  
	  var l=0;
	  $.each(r["d"], function(k1,v1){
	       t=tp;
	        $.each(col, function(k2,v2){
				t=t.replaceall('@'+v2+'@',cstr(v1[v2]));
			});
			t=t.replaceall('@sys_rowindex@',l);
	       $p.append(t);
		   l++;
	});
       callinitall($p,function(){
		     try{
			  $(".table_fixtl",$p.parent()).tableHeadFixer({head: true,left: 1});
			 }catch(e){} 
	      });
		  
});
}catch(e){
 alert('d_data'+e);
}



try{
$('.json2html',$fm_).each(function(){
	var $t=$(this);
	json2html($t);
});
}catch(e){}


// json2 datafield	
try{
var st='';	
$('.json2row',$fm_).each(function(){
	
	var $t=$(this);
	 st=$t.attr('data-json');
    var r = $.parseJSON(st);
	
	var tp=r['tp'];
	var col=r['col'].split(',');
	var kcol=cstr(r['kcol']);
	var inf=url2arr(cstr($t.data('inf')));
	var s='';
	var tpp='';
	var i=0;
	$t.removeAttr('data-json');
	
	kcol='@'+kcol.replaceall(",","@/@")+'@';
	$.each(r["r"], function(k1,v1){
		tpp=tp;
		    tpp=tpp.replaceall('@_k@',kcol);
		 	$.each(col, function(k2,v2){
				tpp=tpp.replaceall('@'+v2+'@',cstr(v1[v2]));
			});
		tpp=tpp.replaceall('@_irow@',i);
		
		s+=tpp;
		i+=1;
	});
	
	
	if(trueval(inf['parent'])){
	 $t=$t.parent();
	}
   $t.html(s);
	
});
}catch(e){
	//alert('json2row.error.'+e);
}



try {
$('.json2field',$fm_).each(function(){

 var $t=$(this);
 var $oj;
 var s=cstr($t.text());
 var d=url2arr(cstr($t.data('dpr')));
 var $g=cpr($t,d['g']);
 var c='';
 var $ojclick;
 
 
 
 if(isfound($g)){ 
 if(s=='null'){s='';}
 if(s != ''){
 $t.empty();
  var r = $.parseJSON(s);
    $.each(r, function(k, v){
		 $oj=$g.find('[name="'+k+'"]');
		 if(isfound($oj)){
		    if(!$oj.hasClass('no_bind')){
			  setojval($oj,v);
		    }	
			if($oj.hasClass('imgs')){
				$oj.trigger('change');
			}
		 }
	});
// trigger click 	

setTimeout(function(){
	try{
	c=cstr($t.data('click'));
	if(c!=''){
		c=c.split('|');
		$.each(c,function( k,v ){
		  v=url2arr(v);	
		  $oj=cpr($t,v['g']).find(v['oj']);
		  ojclick($oj);
		});
	}}catch(e){}
},10);


	
	
	
   }}
 
});	

}catch(e){
alert('json2field.error'+e);
}

dbloopup($fm_,function(){
dblink($fm_,function(){

$('[data-initload]',$fm_).addClass('reqload');
initload();
function initload(){
var $t=$('.reqload:first');	
if(isfound($t)){
var d=url2arr(cstr($t.data('initload')));
var pr=cstr($t.data('dpr'));

if(webstore[pr]){
	$t.html(webstore[pr]);
    $t.removeClass('reqload');
	if($t.hasClass('cmb_initnull')){
		$t.prepend('<option>-SelectAll-</option>');
		$t.val('');
	}
    initload();
}else {
	
pr=url2arr(cstr($t.data('dpr')));
pr['sys']=getsys();
pr['h']=getarrhash();

$t.load(d['f'],$.param(pr),function(r, status, xhr){
	webstore[pr]=r;
 	$t.removeClass('reqload');
	if($t.hasClass('cmb_initnull')){
		$t.prepend('<option>-selectall-</option>');
		$t.val('');
	}
    initload();
});
}
}
}



// set corner
var v='.setcorner,.icorner'.split(',');
for(var i = 0; i < v.length; i++)
{
  if(isfound($(v[i]))){
	  try{
	  $(v[i]).corner('5px');
      }catch(err){}
}}
// center dialog

$('.dialog',$fm_).each(function(){
var $t=$(this);
var h=$t.height()/2;
var w=$t.width()/2;
$t.css({'margin-left':'-'+w+'px','margin-top':'-'+h+'px'});

});
stfunction()
$('isresize')
    .resizable({
        start: function(e, ui) {
            alert('resizing started');
        },
        resize: function(e, ui) {
         
        },
        stop: function(e, ui) {
            alert('resizing stopped');
        }
});

$('.dragr',$fm_).draggable({
	 distance: 10,
	 appendTo: 'body',
	 containment: 'window',
	 helper: 'clone',
start: function(event, ui){
	// save class
	$t=$(this);
	$t.data('class',$t.attr('class'));
	$t.addClass('dragselect');
	

}
,
stop: function(event, ui){
	// restore class
    $t=$(this);
	$t.attr('class',$t.data('class'));	
	$t.removeClass('dragselect'); 
	


}
,revert:true});


$('.isdragbox',$fm_).draggable({
containment: 'parent',
start: function(event, ui){
	// save class

}
,
stop: function(event, ui){
	
}
,revert:false});

$('.isdrag',$fm_).draggable({
start: function(event, ui){
	// save class

}
,
stop: function(event, ui){
	
}
,revert:false});





$('.dropable',$fm_).unbind('dropable');
$('.dropable',$fm_).droppable({
		     hoverClass: 'drophover',
			drop: function( event, ui ) {
			$t=$(this);
			
			
var k=cstr($t.attr('kk'));
var pr={};
var dval=[];
$('.tselectF').each(function(){
  dval.push($(this).attr('data-dropval'));							 
});

dval=dval.uniq();

pr['post']='';
pr['dval']=dval;
pr['tval']=cstr($t.attr('data-dropval'));


//pr['_id']=cstr($t.attr('data-rowid'));
var f='ss/sdrop.php';
doajax(null,f,pr,function(r){
	rpost($t,r);

});


}
});




$('.sortable',$fm_).sortable();
$('.sortable',$fm_).disableSelection();

$('.resizable',$fm_).resizable({grid:[1,10000]});
$('.isresize',$fm_).resizable();

//$('.pfscroll').perfectScrollbar();


var htpreq=gettemplate('.isreq');
$(':input[required]',$fm_).each(function(){
 var $t=$(this);
     if(!$t.hasClass('setreq')){
	    $t.addClass('setreq');
        $t.wrap(htpreq);
	 }
});

$('[data-wrap]',$fm_).each(function(){
 var $t=$(this);
 var tp=gettemplate($t.attr('data-wrap'));
     if(!$t.hasClass('setwraptrue')){
	     $t.addClass('setwraptrue');
		   tp=tp.replace(/@t@/g,ojhtml($t))
           $t.parent().html(tp);
	 }

});

$('.c-1option',$fm_).each(function(){
 var $t=$(this);
 var cfocus=cstr($t.data('cfocus'));
 $t.find('> *').addClass(cfocus);
 $t.find('> *:first').addClass(cfocus+'F');
});


$('.c-tabp',$fm_).each(function(){
var $t=$(this);
if($t.data('settabp')!=true){
   $t.data('settabp',true)
var c=cstr($t.attr('data-fclass'));
$t.find('> *').hide();
$t.find('> *:first').show();
}
});

$('.mc-tabp',$fm_).each(function(){
var $t=$(this);
if($t.data('settabp')!=true){
   $t.data('settabp',true)
var c=cstr($t.attr('data-fclass'));
$t.find('> *').hide();
$t.find('> *:first').show();
}
});





$('.c-tab',$fm_).each(function(){
var $t=$(this);
if($t.data('settab')!=true){
   $t.data('settab',true);	
var c=cstr($t.attr('data-fclass'));
if(c != ''){
$t.find('> *').addClass(c);
$t.find('> *:first').addClass(c+'F');
}
}
});


$('.mc-tab',$fm_).each(function(){
var $t=$(this);
if($t.data('settab')!=true){
   $t.data('settab',true);	
var c=cstr($t.attr('data-fclass'));
if(c != ''){
$t.find('> *').addClass(c);
$t.find('> *:first').addClass(c+'F');
}
}
});









try{
	
getsys();
$.each(sys,function( k,v ){
  try{
	  $g=$('._sysval',$fm_).find('_sys_'+v).val(v);
	  }catch(e){}
});

$('._sys_readonly',$fm_).attr('readonly', true).addClass('is_readonly');
$g=$('._sysval',$fm_);
$g.each(function(){
$oj=$(this);
switch(getojtag($oj)){
case 'inputtext':
     if(cstr($oj.val())==''){
      if($oj.hasClass('_sys_guid')){
       $oj.attr('readonly', true);
       $oj.val(sys['_guid']);	 
	  }
	  if($oj.hasClass('_sys_date')){
        $oj.attr('readonly', true);
        $oj.val(fn_getdate());	 
	  }
	  if($oj.hasClass('_sys_datetime')){
         $oj.attr('readonly', true);
         $oj.val(fn_getdatetime());	 
	  }
	  if($oj.hasClass('_sys_random')){
         $oj.attr('readonly', true);
         $oj.val(guid());	 
	  }
	  if($oj.hasClass('_sys_nullrandom')){
	    if(cstr($oj.val())==''){
          $oj.val(guid());	 
	    }
         $oj.attr('readonly', true);
	  }
	 
	 }
     if($oj.hasClass('_sysguid_all')){
       $oj.attr('readonly', true);
       $oj.val(sys['_guid']);	 
	 }
break;
}
});

}catch(e){
}



//end.initcontrol
try{
initcontrolex($fm_);	
}catch(exx){}
iinitcontrol($fm_,function(){
callback();
});
});
});
}


function updateurlbot(){
if(iurlnode!=-1){
var s='';	
var h=location.hash;
    h=h.replace('#/','');
    h=h.split('?')[0];
	h=h.split('/');
	for(var i=0; i<(iurlnode-1); i++){
		s+=h[i]+'/';
	}
	s+='@';
	var $oj=$('[data-href="'+'#'+s+'"]');
	if(isfound($oj)){
	 $oj.click();
	}else {
	  iurlnode=-1;
	}
}
}

function setupfileupload($fm_){
var $input=$fm_.find('.uploadqq');
if(isfound($input)){
var $lis = {};
var i=0;
var im=0;
var dpr=cstr($input.attr('data-dpr'));
    dpr=url2arr(dpr);
	
 var uploader = new bitcandies.FileUploader({
                url: 'uploadqq/uploads.php',
				default_params:dpr,
                enqueued: function (item) {
                   
                },
                start: function (item) {
                },
                aborted: function (item) {
                },
                progress: function (item, loaded, total) {
                },
                success: function (item) {
					i+=1;
					$('.uploadqq_moniter').html("Upload "+i+" Of "+im);
					if(i==im){
					}
                },
                error: function (item) {
                }
            });

            $input.change(function () {
									
                var files = document.getElementById('file').files;
				im=files.length;
				i=0;
                for (var i = 0; i < files.length; ++i) {
                    uploader.add(files[i]);
                }
                return false;
            });	

}
}
function initfill($fm_,callback){
	
	
	

	
	
updateresize();
setupfileupload($fm_);
initcontrolui($fm_);
$('table.gridcontrol',$fm_).find('tr:first').addClass('gridcontrolhrow');

// 1click
var $tx;
var $imgurl=$fm_.find(':input.imgurl');
    $imgurl.each(function(){
	   $tx=$(this);
	   $tx.parent().find('img').attr('src',$tx.val());
	 });

var $oclick=$fm_.find('.init0');
$oclick.each(function(){
$tx=$(this);
if($tx.hasClass('init0')){
	  $tx.removeClass('init0');
	  $tx.click();
	  }
});


var $oclick=$fm_.find('.1click');
var $tx;
var delay;
$oclick.each(function(){
$tx=$(this);
delay=cstr($tx.data('delay'));

if($tx.hasClass('1click')){
	 $tx.removeClass('1click');
      if(delay!=''){
	   delay=cint(delay);
	   delayclick($tx,delay);
	  }else{
	    $tx.click();
	  }
	 }
});
// 1click
var $oclick=$fm_.find('[data-inittg]');
var $tx;
$oclick.each(function(){
$tx=$(this);
 if(isfound($tx)){
	  $tx.trigger($tx.data('inittg'));
	  $tx.removeAttr('data-inittg');
	}
});
	
try{	
$('.nullhide:empty',$fm_).hide();	
}catch(err){}



try{	
$('._getfocus',$fm_).focus();	
}catch(err){}


// last section
try{
$('._remove',$fm_).remove();
}catch(err){}

try{
initfillex($fm_);	
}catch(exx){}
// custom 

if(req_changepr){
req_changepr=false;
gurl=cstr(gurl.split('?')[0]);
}
iinitfill($fm_,function(){
callback();
});
}

