jQuery.fn.extend({
    unwrapInner: function(selector) {
        return this.each(function() {
            var t = this,
                c = $(t).children(selector);
            if (c.length === 1) {
                c.contents().appendTo(t);
                c.remove();
            }
        });
    }
});
jQuery.expr[':'].ifillter = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
 };

Array.prototype.uniq = function(){
  return this.filter(
      function(a){return !this[a] ? this[a] = true : false;}, {}
  );
}

// string function 

if (typeof String.prototype.startwith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

//  Checks that string ends with the specific string...
if (typeof String.prototype.endwith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}
String.prototype.isstring = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};
String.prototype.contains = function(str, ignoreCase) {
  return (ignoreCase ? this.toUpperCase() : this)
    .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
};
String.prototype.replaceall = function(target, replacement) {
  return this.split(target).join(replacement);
};
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}
$.fn.isfound = function () {
    return this.length !== 0;
}




function ojhide($t){
try{$t.hide();}catch(e){}
}
function ojshow($t){
try{$t.show();}catch(e){}
}


function rcut(s){
if(s !=''){
 s=s.substr(0,s.length-1); 
}
return s;
}
function rcutn(s,n){
if(s !=''){
 s=s.substr(0,s.length-n); 
}
return s;
}
function lcutn(s,n){
if(s !=''){
s=s.substr(n,s.length-n); 
}
return s;
}
function lcut(s){
if(s !=''){
s=s.substr(1,s.length-1); 
}
return s;
}
function gpage($t){
  return cpr($t,'.gpage');
}

function set_tselect($t){
try{
	
if(!$t.hasClass('tselect')){
return;
}	
		
if($t.hasClass('tselectF')){
   $t.removeClass('tselectF');
}else {
   $t.addClass('tselectF');
}

var $g=cpr($t,'.tselectg');
if(isfound($g)){
var $c=$g.find('.tselectn');
var val='';
if(isfound($c)){
	$c.html($g.find('.tselectF').length);
	$g.find('.tselectF').each(function(){
	 val+=cstr($(this).data('selectval'))+',';
	});
}}
if(val!=''){val=rcut(val);}
var $val=$g.find('.tselectval');
if(isfound($val)){
$val.val(val);
}


}catch(e){ 
//alert('tselect.error'+e);
}
}


function urlval(s,chk){
var s1=url2arr(cstr(s.split('?')[1]));
return cstr(s1[chk]);
}
function cutaffter(s,chk){
return 	 cstr(s.substring(0, s.indexOf(chk)));
}
function isempty( el ){
  return !el.has('*').length;
}
function fclass($t){

}



function jqpost($t,d){

try { 

var dc;
var $tx;
var $ojclear=null;
var tg=$t[0].tagName.toLowerCase();


if(cstr(d['clear_panel'])!=''){
   dc=cstr(d['clear_panel']).split('>');	
var $gx=cpr($t,dc[0]);
$ojclear=$gx.find(dc[1]);
$ojclear.each(function(){
 $tx=$(this);
 $tx.data('html',$tx.html());
 $tx.empty();
});
}



var  tagname=cstr($t[0].tagName.toLowerCase());
if($t.hasClass('vals')){
$t.val('');
}


if($t.hasClass('isprocess')){
  return;
 }



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
		vname=cstr($frm.attr('name'));
		if(vname==''){
		   vname='p';
		} 
        pr[vname]=getdataform($frm);
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


var qform=cstr(d['qform']);
if(qform!=''){
	
	
var qform=qform.split(',');	
var $fx;
var allpr={};
var vx;
$.each(qform,function( k,v ) {
		v=v.split('\\');
		$fx=cpr($t,v[0]);
		if(isfound($fx)){
		 $fx=$fx.find(v[1]);
		 if(isfound($fx)){
			   $fx.wrap("<form id='fxpost'></form>");
	           var dx=getdataform($('#fxpost'));
			   vx=cstr($fx.attr('name'));
			   if(vx==''){
			     vx=cstr($fx.attr('data-name'));
			   }
			   if(vx==''){vx=k;}
			   allpr[vx]=dx;
               $fx.unwrap();
		}}
		
});	
 pr["qform"]=allpr;

}

var qformc=cstr(d['qformc']);{
if(qformc!=''){
 var $gx=cpr($t,d['g']);
 var vx={};
 $gx.find(qformc).each(function(){
   $tx=$(this);
   vx[$tx.attr('name')]=getojval($tx);
 });
 pr["dx"]=vx;
}
}
// datadenter field 
var vx={};
$('.datacenter_field').each(function(){
	$tx=$(this);
    vx[$tx.attr('name')]=getojval($tx);
});
 pr["dc"]=vx;


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
//$t.effect("highlight",{'color':'red'}, 1000);



var dform=cstr(d['dform']);
if(dform!=''){
try {
var $fx=cpr($t,dform);
if(isfound($fx)){
    $fx.wrap("<form id='fxpost'></form>" );
	var dx=$('#fxpost').serializeJSON();
		pr['dx']=dx;
    $fx.unwrap();
 }else {
   alert('not found dform'+dform);	
 }
 }catch(e){}
}

if(f.lastIndexOf(".php")==-1){
 f+='.php';
}


alert('file='+f+'  :  '+jcstr(pr));

if($ojclear!=null){
 $ojclear.each(function(){
  $tx=$(this);
  $tx.html($tx.data('html'));
   callinitall($tx,function(){});
});
}


doajax($t,f,pr,function(r){
	
	alert(r);
	
// clear status 	
$t.removeClass('_isposting');
$t.removeClass('isprocess');
var $ojwait=$t.find('.imgprocess:first').parent();
if(isfound($ojwait)){
     $ojwait.remove();
}

if(r!=''){
    msgbox('r.'+r);
	gdb['ppr']=null;	

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
}
function jqload($t,d){

try{
var $g=null;
var option=url2arr(cstr($t.data('inf')));
if(cstr(d['g'])!=''){
 $g=cpr($t,d['g']);
 $g.addClass('isprocess');
}
}catch(err){}


// switch mode
var reqexit=false;
switch(cstr(option['mode'])){
case 'load1':
var $pchk=cpr($t,d['g']).find(d['oj']);
if($pchk.isfound()){
  if($pchk.html().trim()!=''){
	  reqexit=true;
   break;
  }
}
break;
case 'loadall':
	 cpr($t,d['g']).find(d['oj']).empty();
break;
}
if(reqexit){
return;
}


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
return;
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

// get query form
var $fx;
var qform=cstr(d['qform']);
if(qform!=''){
	
var qform=qform.split(',');	

$.each(qform,function( k,v ) {
	
	//alert(k+':'+v);
	
		v=v.split('\\');
		$fx=cpr($t,v[0]);
		if(isfound($fx)){
		 $fx=$fx.find(v[1]);
		 if(isfound($fx)){
			   $fx.wrap("<form id='fxpost'></form>");
	           var dx=$('#fxpost').serialize();
	           pr=sumurl(pr,dx);
              $fx.unwrap();
		}}else {
		  alert('qform'+v+'  not found');
		}
});	
}

// gettting form datacenter
$fx=$('#frm_datacenter');
if($fx.isfound()){
   $fx.wrap("<form id='fxpost'></form>"); 
   var dx=$('#fxpost').serialize();
   pr=sumurl(pr,dx);
   $fx.unwrap();
}


var qformc=cstr(d['qformc']);
if(qformc!=''){
var qformc=qformc.split(',');	
var $fx;
var $tx;
var i=0;
var vname='';
$.each(qformc,function( k,v ){
	v=v.split('\\');
	$fx=cpr($t,v[0]);
	if(isfound($fx)){
		 $fx=$fx.find(v[1]);
		 if(isfound($fx)){
			vname=cstr($fx.attr('name')); 
			if(vname==''){
			 vname='r'+i;
			}
		   $fx.find(':input').each(function(){
			  $tx=$(this);
			   pr+='&'+vname+'['+cstr($tx.attr('name'))+']='+getojval($tx);
			});
		 }
	}
	i+=1;
});
}

$('.datacenter_field').each(function(){
	$tx=$(this);
	pr+='&'+cstr($tx.attr('name'))+'='+getojval($tx);
});



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


try{
if(cstr(ppr['_pagereq']=='true')){
  pr=cstr($t.data('pr'));
  //alert('by page');
}}catch(e){}
//save lastquery


try{
var stag=cstr($t.attr('data-tag'));
pr+=stag;
$t.removeAttr("data-tag");
}catch(e){}

$t.data('pr',pr);
pr+="&reqid="+guid().replaceall('-','').substring(0, 4);
$t.removeAttr("data-ppr");
jload($t,$poj,cfilename(cstr(d['f'])),pr, function(r, status, xhr){
	
	
	if($t.hasClass('1load')){
	   $t.removeClass('1load').addClass('1loady');
	}
			
	if($g!=null){
	$g.removeClass('isprocess');
	}
	
							  
msgbox('r.'+r);
$t.removeClass('isprocess');
// set remove mark
$poj.find('.imgprocess').parent().remove();
$poj.removeClass('isprocess');							

	 rload($t,$p,$poj);
 
	  $poj.data('state',1);	
	  $poj.data('rebind','r');
	 
initall($poj,function(){
	
});
});
}else {
	
//   $t.removeClass('isprocess');
}

}else {
	alert('not found panel for load : '+cstr($t.attr('data-a')));
}
}

}


function jtoggle($t,d){
try{
	
var $oj=getoj($t,d);
var c=cstr(d['init']);
var c2=cstr(d['inits']);
var cc=cstr(d['cclass']);
var gclass=cstr(d['gclass']);
var fn=cstr(d['fn']);
var k=cstr(d['k'])
var $ojc;
var delay=0;




if(fn!=''){
 if(fn=='open'){
    if(cstr($oj.css('display'))!='none'){return;}
  }
  if(fn=='close'){
    if(cstr($oj.css('display'))=='none'){return;}
  } 
}

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
	if(gclass!=''&& cc!='' ){
		try{
	    cpr($t,gclass).find(cc).not($oj).hide();
		}catch(ex){}
	}
	if(cstr($oj.css('display'))!='none'){
		$ojc=$oj.find(c);
		if(!$ojc.hasClass('initopenF')){
			$ojc.addClass('initopenF');
	        $ojc.click();
		}
		if(c2!=''){
		  ojclick(cpr($t,d['g']).find(c2));
		}
	}
}
}catch(e){
 alert('jtoggle.error.'+e);	
}	
}

function jload($t,$p,f,pr,callback){
// do imprement cache	
var vc=cstr($t.data('cache'));
var h=''
if(vc!=''&& (vc in cache)){
	 h=cache[vc];
	 $p.html(h);
	callback(h,true,true);			  
}else {
 $p.load(f,pr, function(r, status, xhr){
	  if(vc!=''){
		  cache[vc]=r;
	 }					
	 callback(r,status,xhr);			  
 });
}
}

function trueval(v){
v=cstr(v);
if(v=='true'|| v=='1'){
return true;
}
return false;
}

function data2click($t,d){
 var init=cstr($t.data(d));
		 var sall=init.split('|');
		 $.each(sall, function(k, v){
			  var d=url2arr(v);
		      ojclick(getoj($t,d));
		 });
}

function clear_url(d){
try{
	
var u=cstr(d).split(',');
var h1=location.hash;
var h=location.hash.split('&');;
$.each(h, function(k,v) {
	 $.each(u, function(k1,v1) {
	    if(v.startsWith(v1+'=')){
		   h1=h1.replace('&'+v,'');
	     }
	 });
});
location.hash=h1;
}catch(e){}
}
function jcstr(o){
return JSON.stringify(o);
}
function selectt($o){
$o.css('background-color','red');
}
function d_map($t){
try{
var d=url2arr(cstr($t.attr('data-dpr')));
var $g=cpr($t,cstr(d['g']));
var $oj=null;
var r = $.parseJSON(cstr($t.text()));
       $.each(r, function(k, v){
	        $oj=$g.find('[name="'+k+'"]');
            if(isfound($oj)){
				setojval($oj,v);
	       } 	   
	   });
}catch(e){}
}
function d_bind($t){
try {
	
	
var d=url2arr(cstr($t.attr('data-dpr')));
var s=cstr($t.text());
var sx='';
var $g=cpr($t,cstr(d['g']));
var r = $.parseJSON(s);
var tp='';
var tpp;
var st='';
var srow='';
var i=0;


if(cstr(d['oj'])!=''){$g=$g.find(d['oj'])}

$.each(r, function(kx, vx){
	  st='';	
	  tp=cstr(vx['tp']);
	  if(tp==''){tp='<option >@1@</option>';}
      $.each(vx['d'], function(k, v){
		        srow=tp;
				i=0;
		        $.each(v, function(k1, v1){
				  srow=srow.replaceall('@'+k1+'@',v1);
				  srow=srow.replaceall('@'+i+'@',v1);
				  i+=1;
				});
				
				st+=srow;
	  });
	  
	  
	  
      $oj=$g.find('[name="'+kx+'"]');
	  if(isfound($oj)){
		  $oj.html(st);
	  }
	});
   
}catch(e){}
}


function json2html($t){
try {
	
	
var d=cstr($t.attr('data-dpr'));
var s=cstr($t.text());
var sx='';
var $g=cpr($t,cstr(d['g']));
var r = $.parseJSON(s);
var tp='';
var tpp;
var st='';
var srow='';
var i=0;
    $.each(r, function(kx, vx){
	  st='';	
	  tp=vx['tp'];
      $.each(vx['d'], function(k, v){
		        srow=tp;
				i=0;
		        $.each(v, function(k1, v1){
				  srow=srow.replaceall('@'+k1+'@',v1);
				  srow=srow.replaceall('@'+i+'@',v1);
				  i+=1;
				});
				
				st+=srow;
	  });
	  
      $oj=$g.find('[name="'+kx+'"]');
	  if(isfound($oj)){
		  $oj.html(st);
	  }
	});
}catch(e){}
}


function reptp(d,col,tp){
try {
var cols=col.split(',');
   $.each(cols, function(k, v){
		tp=tp.replace('@'+v+'@',cstr(d[v]));				 
   });

}catch(e){}
return tp;
}

function setactiveclass($g,$t,s){
if(isfound($g)){
}else {
$('.'+s).removeClass(s);
$t.addClass(s);
}
}


function readdatastore(){
try{
var $oj;
$.each(valstore, function( k, v ) {
	$oj=$('.v_'+k);
	if(isfound($oj)){
	 $oj.html(v);
	}
});
}
catch(e){}
}
function callinitall($p,callb){
try{
	
$p.data('isbind','r');
initall($p,function(){
 callb();
});

}catch(ex){}
}
function isshow($oj){
if($oj.css('display')=='none'){
	return false;
}
return true;
}
function isnumberic(data){
	try{
    return parseFloat(data)==data;
	}catch(e){}
	return false;
}
function ojclick($oj){
try{
if(isfound($oj)){
$oj.click();
}}catch(e){}
}
function uimg(){
 return 'u/u/'+loginid+'/img/u.jpg';
}
function getuimg(s){
 return 'u/u/'+s+'/img/u.jpg';
}

function  arrpath(h){
var s='';
var i=0;
$.each(h, function(k, v){					
i+=1;
s+=v+'/';
});
s=rcut(s);
return s;
}
function  arrpath2(h){
var s='';
var i=0;
$.each(h, function(k, v){	
if(i<h.length-1){				   
				   
i+=1;
s+=v+'/';



}});
s=rcut(s);
return s;
}


function delayclick($t,delay){
setTimeout(function(){
 $t.click();
},delay);
}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
function imgError(img){
	img.onerror = "";
    img.src = "c/nophoto.jpg";
    return true;
}

function arr_push(arr1,arr2){
var sall={};
$.each(arr1,function(k,v ){
	sall[k]=v;
});
$.each(arr2,function(k,v ){
	sall[k]=v;
});
return sall;
}
function cuthashurl(scut){
var hash=location.hash;
var arr=url2arr(hash);
$.each(arr,function(k,v ){
	if(k.indexOf(scut) == 0){
		unset(arr,k)			  
	}
});
var url=hash.split('?')[0]+'?'+arr2url(arr);
    hash=url.replace('?&','?');
	return hash;
}

function cfilename(s){
s+='.php';
s=s.replace(".php.php",".php");
return s;
}
function urlupdate($t){
try {	
var s=cstr($t.attr('href'));
var inf=cstr($t.data('inf'));
var d=[];
var $oj;
var $g;
var  ojname,ojval;


if(inf!=''){
d=url2arr(inf);


if(cstr(d['cformfill'])!=''){
$g=cpr($t,d['cformfill']);
$g.find(':input').each(function(){
$oj=$(this);
ojname=cstr($oj.attr('name'));
if(ojname!=''){
   s=s.replace('@'+ojname+'@',$oj.val());
}
});	
} 
 
if(cstr(d['cform'])!=''){
$g=cpr($t,d['cform']);
if(isfound($g)){
if($g.is('form')){
	   var allpr=$g.serialize();
s+=allpr;
}else {
  $g.find(':input').each(function(){
  $oj=$(this);
  ojname=cstr($oj.attr('name'));
  if(ojname!=''){
	 ojval=getojval($oj);
      s+="&"+ojname+'='+getojval($oj);
   }
});   
}	
}
s=s.replace('?&','?');
}
}

if(s!=''){
	  if(cstr($t.data('requrl')) != ''){
		  s=cstr($t.data('requrl'));
	  }

		 
		 var fid=cstr(sys['fid']);
		 if(fid==''){
		    fid='999';
		 }
		 
      s=s.replace("@mid@",fid);
      s=s.replace("@fid@",fid);
      s=s.replace("@loginid@",loginid);
      s=s.replace("@login_id@",loginid);
      s=s.replace("@cid@",sys['cid']);
	  
var option=cstr(d['option'])	
if(option=='pushurl'||cstr(d['pushurl'])=='true'){

var hashurl=cuthashurl('q[');
var sf=cstr(hashurl.split('?')[1]);
var arr1=url2arr(sf);
var arr2=url2arr(s);
var sall=arr_push(arr1,arr2);

s='';

$.each(sall,function(k,v ){
 s+='&'+k+'='+v;
 if(d['bypass']!=''){
    if(k==d['bypass']){
        return false;
    }	
 }
});

s=cstr(hashurl.split('?')[0])+'?'+s;
}

s=s.replace("@t@",gett())	
s=commiturl(s);
s=s.replace('?&','?');


// query url
var qarr=url2arr(s);
var $qurl=$('[data-qurl]');
var qurl='';
$qurl.each(function(){
$tx=$(this);
qurl=cstr($tx.data('qurl'));
$tx.val(cstr(qarr[qurl]));

});

location.hash=s;
urlreq=true;
}}catch(err){}
}


function commiturl(s1){
var n = s1.indexOf("?");
if(n==-1){return s1;}

var s=s1.split('?');
var b=s[1].split('&');
var c='';
$.each(b,function(k,v ){
   v=v.split('=');
   if(!cstr(v[1])==''){
	   c+='&'+v[0]+'='+v[1];
   }
});
c=s[0]+'?'+c;
c=c.replace('?&','?');
return c;
}
function unset(d,v){
try{
delete d[v];
}
catch(e){
}
}


$.fn.outerHTML = function() {
    if ($(this).attr('outerHTML'))
        return $(this).attr('outerHTML');
    else
    {
    var content = $(this).wrap('<div></div>').parent().html();
        $(this).unwrap();
        return content;
    }
}

function isurl(textval) {
var urlregex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  return urlregex.test(textval);
}
function isurl_img(url,callb) {
$("<img>", {
    src: url,
    error: function() {callb(false); },
    load: function() { callb(true); }
});
}




function geturlq(qurl){
	
	
	var x=gurl.replace('#','');
	if(x.substr(0,1)=='/'){
	 x=x.substr(1,x.length-1);
	}
	
	
	var a=x.split('/');
	
switch(a[0]){
case 'c':
if(cstr(a[1])!=''){
	a[1]='@1';
	if(cstr(a[3])!=''){
	  a[3]="@3"
	}
}
break;


case 'viewlog':
	a[1]='@1';
break;
case 'u':
if(cstr(a[1])!=''){
	a[1]='@u';
}
break;
}
	
	
	
	
	var s='';
	for(var i=0; i<a.length; i++){
	 s+=a[i]+'/';
	}
	if(s!=''){
	 s=s.substr(s,s.length-1);
	}

return s;
}
function updatesystemurl(){

var h=location.hash.replace('#','');
h=h.split('/');
switch(h[0]){
case 'u':
if(h.length>=2){
sys['fid']=cstr(h[1]);
}
break;
case 'c':
if(h.length>=2){
sys['cid']=cstr(h[1]);
}
break;
case 'room':
break;
}	
	
	
}


function sumurl(a,b){
var aa=url2arr(a);
var bb=url2arr(b);
var chk='';
var s='';
$.each(bb,function(k,v ){
aa[k]=v;				   
});
$.each(aa,function(k,v ){
s+='&'+k+'='+v;				   
});
return s;
}
function printmsg(s){
$('body').append('<div class="printmsg">'+s+'</div>');
setTimeout(function(){
 $('.printmsg').remove();
},1000);
}
function fillval(s){
	try{
	 s=s.replace(/@loginid@/g,gdb['login']['mid']);
	 s=s.replace(/@login_id@/g,gdb['login']['mid']);
	 s=s.replace(/@aname@/g,gdb['login']['aname']);
	 }catch(err){}
	 try{
		 if(cstr(sys['fid'])!=''){
	 s=s.replace(/@fid@/g,sys['fid']);
		 }else {
	 s=s.replace(/@fid@/g,gdb['login']['mid']);
		 }
	 }catch(err){}
return s;
}
function urldiff(a,b){
	
var a1=a.split('/');
var a2=b.split('/');

var n1=a1.length-1;
var n2=a2.length-1;
var i=0;
var at;
if(n2>n1){
at=a1;
a1=a2;
a2=at;

at=n2;
n1=n2;
n2=at;

}

var s='';
for(i=0; i<=n1; i++){
	
if(a1[i]==a2[i]){
	s+=a1[i];
}else{
   s+='@';
}
if(i<n1){
s+='/';
}
}
return s;
} 



function urlchange(a,b){
a=a.split('/');
b=b.split('/');

var r='';
var i=0;
var v='';
try{
for (i= 0; i < a.length; i++) {
if(a[i]==b[i]){
}	
}
}catch(e){}

for(var j=0; j<i; j++){
v=	cstr(b[j]);
if(v!=''){
r+=b[j]+'/';
}
}


if(r!=''){
r=r.substr(0,r.length-1);
}
return r;
}



function geturlcode(si,urlin){
var s=si.split('/');
var url=urlin.split('/');

switch(s[0]){
case 'room':
s[1]='?';
break;
case 'c':
s[1]='?';
break;
case 'u':
s[1]='?';
if(s.length>=3){
s[2]=url[2];
}
break;




}

var ilen=s.length;
if(url.length < s.length){
ilen=url.length;
}


var i=0;
var sa='';
for(i=0; i<ilen;i++){
sa+=s[i]+'/';
}
sa=rcut(sa);
return sa;

}

function addlog(s){
var $o=$('#plog');
$o.append('<div class="logitem">'+s+'</div>');
}

function delaytrigger($oj,tg,n){
try{
	
setTimeout(function(){

$oj.trigger(tg);

},n);	
	

}catch(err){
}
}



function pushattr($ojs,$t,sattr){
try {

var $oj;
var s='';
var arrt;
var arro;
$ojs.each(function(){
	$oj=$(this);
	arrt=url2arr(cstr($t.attr(sattr)));
	arro=url2arr(cstr($oj.attr(sattr)));
	$.each(arrt, function(k,v) {
	   arro[k]=v;
	});
	s='';
	$.each(arro, function(k,v) {
	   s+='&'+k+'='+v;
	});
	$oj.attr(sattr,s);
});



}catch(err){}
}

function clearclass($g,c){
	try { 
       $g.find('.'+c).removeClass(c);
	}catch(err){
	}
}

function clearclass(c){
$('.'+c).removeClass(c);
}
function esccmd(){
try {	





var $oj;
$oj=$('.esc2hide');
if($oj.isfound()){
$oj.hide();
}

try{
 $('.esc2empty').empty();
 }catch(err){
}

try{
 $('.esc2click').click();
 }catch(err){
}


/*
// default hide any popup

var $oj=$('.esc2click_last:not(:hidden):last');
if(isfound($oj)){
	  $oj.click();
	  return;
}





var $esc2hide=$('.esc2hide:not(:hidden):last');
if(isfound($esc2hide)){
           $esc2hide.hide();
  return;
}

var $oj=$('.esc2click');
if(isfound($oj)){
	  $oj.click();
}
*/


}catch(err){
 //alert('esccmd.error.'+err);
}
}

function qwall(fid){
	
sys['fid']=fid;
var $b=$('._urlhome');
if(isfound($b)){
 $b.click();
 topscroll($('body'),100);
}else {
elog['qwall']=sys['fid'];	
var $app=$('[data-appid="socialclass"]');
    $app.click();
}
}

function updatebodyscroll(){
try {	
 var $oj=$('.fullsc:not(:hidden)');
if(!isfound($oj)){
  // $('body').css('overflow','auto');
 }
}catch(err){}
}

function doajax($t,f,d,docallback){
try{
	try{
	d['sys']=getsys();
	}catch(ex){}
       $.ajax({
			type: 'POST',
			url: f,
			data:d,
			  dataType: "text",
			  error:function (xhr, ajaxOptions, thrownError){
                    docallback('1.doajax error '+thrownError+' file:'+f+' data:'+d);
                },
			   success: function(r){
				    docallback(r);
                }
       });
}catch(err){
	alert('2.doajax error'+err);
}
}

function ojishide($o){
 if($o.css('display')=='none'){
	 return true;
 }
 return false;
}
function cnum(oj){
try{
 if(oj==null||typeof oj=='undefined'||oj==''){
	 oj=0;
 }

if(isNaN(oj)){
	return 0;
}
 return parseFloat(oj);
}catch(err){return 0;}
}

function cint(oj){
 try{
 if(oj==null||typeof oj=='undefined'||oj==''){
	 oj=0;
 }

if(isNaN(oj)){
	return 0;
}
 return parseInt(oj);
}catch(err){return 0;}
}

function cstr(oj){
try {
if(oj==null||typeof oj=='undefined'|| oj=='null'){
	 oj='';
 }
 return String(oj);
}catch(err){
}
return '';
}
function getoj($t,d){
	
var $oj=null;
try{
if(cstr(d['g'])!=''){
 $oj=cpr($t,d['g']);
}
if(cstr(d['oj'])!=''){
 if(isfound($oj)){
	$oj=$oj.find(d['oj']);
 }else{
	$oj=$(d['oj']);
 }
}
if(d['g']=='this'){
  $oj=$t.find(cstr(d['oj']));
}}catch(e){}
return $oj;
}
function isfound($o){
try{
    if($o==null||typeof $o=='undefined'){return false;}
	if ($o.length != 0) {return true;}else{return false;}
	}catch(err){
		return false;
	}
	return false;
}
function isf($o){
 return isfound($o);
}
function ojhtml($x){
	if(isfound($x)){
	      return $x.outerHTML();
    }
	return '';
}

function arrurl(s){
var alld=s.split('&');
var v;
var col={};
$.each(alld, function(index, value){
if(value!=''){
v=value.split('=');
col[v[0]]=v[1];
}
});
return col;
}




function createprivatepage(page,$t){
var h='';
h='<div class="privatepage" data-pg="'+cstr(page)+'">';
h+='';
h+='</div>';
return h;
}




// privatefunction 


function linkisimg(url,callback) {
    $("<img>", {
        src: url,
        error: function() { callback(url, false); },
        load: function() { callback(url, true); }
    });
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function fn_getdate(){
var d = new Date();
    var day = addZero(d.getDate());
    var month = addZero(d.getMonth()+1);
    var year = addZero(d.getFullYear());
    return day + "/" + month + "/" + year;
}
function fn_getdatetime(){
 var d = new Date();
    var day = addZero(d.getDate());
    var month = addZero(d.getMonth()+1);
    var year = addZero(d.getFullYear());
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return day + "/ " + month + "/ " + year + " (" + h + ":" + m + ")";

}
function setcookie(k,v){
  $.cookie(k,v, {expires:7});
}
function getcookie(k){
   return cstr($.cookie(k));
}
function getsys(){
try{
	
var _guid=cstr($.cookie('_guid'));
if(_guid==''){
 $.cookie('_guid', guid(), { expires: 7 });
 _guid=cstr($.cookie('_guid'));
}
sys['_guid']=$.cookie('_guid');
}catch(e2){
}	
	
	
try{	
sys['hurl']=location.hash;
}catch(e1){}

try { 	
sys['kseq']=getkeyseq();
sys['cfg']=cfg;
sys['loginid']=getcookie('loginid');
sys['aname']=getcookie('aname');

}catch(err){}
return sys;
}

function getparam(s){
var r='';
$.each(s, function(k, v){
r+='&'+k+'='+v;
});


return r;
}
function getparameter($t){
try{




var pr ={};
var dpr=cstr($t.attr('data-dpr'));
var ppr=cstr($t.attr('data-ppr'));
var lpr=cstr($t.attr('data-lpr'));


//$t.removeAttr('data-ppr');
var arr={}

var inf=cstr($t.data('inf'));

if(inf!=''){
 inf=str2pr(cstr($t.data('inf')));
 if(cstr(inf['cform'])!=''){
	$frm=cpr($t,cstr(inf['cform']));
	 if(isfound($frm)){
         pr['field']=getdataform($frm);
        $t.data('isallow',$frm.data('isallow'));
     }
    pr['inf']=inf;
 }
 
 
 if(cstr(inf['ginf'])!=''){
 var $ginf=cpr($t,inf['ginf']);
 var ginf='';
  if(isfound($ginf)){
	 ginf=cstr($ginf.data('ginf'));
	 if(ginf!=''){
	       pr['ginf']=url2arr(ginf);
	 }
  }
 }
 
if(cstr(inf['dbgrid'])!=''){
var dbgrid=cstr(inf['dbgrid']);
var $grid=cpr($t,'.dbgroup').find(dbgrid);
var $row;
var row={};
var allrow={};
var irow=0;
if(isfound($grid)){
	$grid.find('.datarow').each(function(){
     $row=$(this);
	 row={};
	 $row.find(':input').each(function(){
		 row[cstr($(this).attr('name'))]=cstr($(this).val());
	  });
	  allrow[irow]=row;
	  irow+=1;
	});
}
pr['dbgrid']=allrow;
}


 
 
 
}


// field data link


if(lpr != ''){
 arr=str2pr(lpr);
 var field={};
 var $gm=cprfind($t,arr['g'],arr['oj']);
 var ojname='';
 var vval='';
if(isfound($gm)){
	$gm.find(arr['field']).each(function(){
    ojname=getojtag($(this));
	
    switch(ojname){
	case 'inputtext':
	 	     field[cstr($(this).attr('name'))]=$(this).val();
	break;
	case 'inputselect':
	     field[cstr($(this).attr('name'))]=$(this).val();
	break;
	case 'inputcheckbox':
	     field[cstr($(this).attr('name'))]=getcheckboxnum($(this));
	break;
	default:
	    if($(this).is('[data-vval]')) {
	     field[cstr($(this).data('field'))]=cstr($(this).data('vval'));
        }else {
	     field[cstr($(this).data('field'))]=cstr($(this).data('val'));
		} 
	break;
	}
   });
	
   pr['field']=field;
}}




if(ppr!=''){
   pr['ppr']=str2pr(ppr);
}

//if(gstate['login']==true){
 pr['sys']=getsys();
 pr['pval']=pval;
 pr['h']=getarrhash();

if(cstr(dpr)!=''){
 dpr=str2pr(dpr);
  $.each( dpr, function( key, value ) {
	//if(key !='dform'){  
      pr[key]=value;
	//}
  });
}
unset(pr,'dform');

return pr;

}catch(err){ onerror('getparameter:',err);}
}


function getarrhash(){
try{
var h=location.hash.split('?');
if(h.length==2){
	return url2arr('&'+h[1]);
}}catch(err){}
}

function onerror(fn,msg){
 alert('function :'+fn+' error wirh :'+err);
}


function removeeffect($o,speed,callb){
try {	
if(isfound($o)){
	          $o.animate({'background-color':'#FFF'},speed)
			  .animate({'background-color':'#F36'},speed)
			  .animate({'background-color':'#FFF'},speed);
              $o.slideToggle(speed,function(){
                 $o.remove();
				 callb();
              });
}else {
callb();                                                       
}	
}catch(err){callb();}
} 

function takeeffect($o,speed){
try {	
if(isfound($o)){
	         $o.animate({'background-color':'#FFF'},speed)
			  .animate({'background-color':'#F36'},speed)
			  .animate({'background-color':'#FFF'},speed)
			  .animate({'background-color':'#F36'},speed)
			  .animate({'background-color':'#FFF'},speed);
 
}	
}catch(err){}
}

function ldoajax($t,f,pr,callback){
 $t.data('vals',null);
 doajax($t,f,pr,function(r){
						 alert(r);
	if($t.data('vals')!=null){
     ldoajax($t,f,pr,function(){
	  });   
	}else {
	  callback();
	}
 });
}

function bpost($t,callb)
{
 callb(true);
}


function getojdata($p,s1,s2){
var $r=$p.find(s1);
var r='';
if(isfound($r)){
 r=cstr($r.data(s2));
}
return r;
}
function getojattr($p,s1,s2){
var $r=$p.find(s1);
var r='';
if(isfound($r)){
 r=cstr($r.attr(s2));
}
return r;
}

function isdebug(){
try { 	
var	$v=$('#isdebug');
if(isfound($v)){
if($v.prop('checked')){
	return true;
}	
}
}catch(err){};
return false;
}
function msgbox(s){
try { 	
	
var	$v=$('#isdebug');
if(isfound($v)){
if($v.prop('checked')){
	alert(s);
}	
}
}catch(err){};
}

function getpanelid($p,id){
var $o=$p.find('#'+id);
if(!isfound($o)){
    $p.prepend('<div id="'+id+'"></div>')
$o=$p.find('#'+id);
}
return $o;
}


function updatememberinfo(){
try {

$('.nsumfriend').html(cint(gdb['login']['nsumfriend']));
$('.nsumconn').html(cint(gdb['login']['nsumconn']));
$('.nsumapp').html(cint(gdb['login']['nsumapp']));

}catch(err){
}
}

function rpost($t,r)
{	
try {
var rt = $.parseJSON(r);
if(cstr(rt['h']) !=''){
       var $div=$t.parent().find('.qreturn:eq(0)');
	    if(!isfound($div)){
			$('<div class="qreturn"></div>').insertAfter($t);
	        $div=$t.parent().find('.qreturn:eq(0)');
		}
	   $div.html(rt['h']);
		  $div.data('isbind','a');
		   initall($div,function(){
		});
}















if(cstr(rt['setval']) !=''){
var jsdata=rt['setval'];
var g=cstr(rt['setvalg']);
var $g;
var $oj;
if(g!=''){$g=cpr($t,g);}
$.each(jsdata, function(k, v){
		sval[k]=v;
		if(isfound($g)){
	     $oj=$g.find('.'+k);
		}else {
	     $oj=$('.'+k);
		}
		if(isfound($oj)){
		 $oj.html(v);
		}
		
});

}

if(cstr(rt['truetext']) !=''){
	var h=cstr(gettemplate('.truealert'));
	if(h!=''){
	$('body').append(h);
	var $ojalert=$('.truealert:last');
	    $ojalert.find('.alerttext').html(rt['truetext']);
	setTimeout(function(){
	     $ojalert.remove();
	},1000);
	}
	
	
}


if(cstr(rt['tattr']) !=''){
     var vv=cstr(rt['tattr']).split(',');
	 $t.attr(cstr(vv[0]),cstr(vv[1]));
}





var d=str2pr(cstr($t.data('dpr')));



switch(cstr(d['mod'])){
case 'login':
if(cint(rt['ccount'])>0){
	
	$('.startlogin:first').click();
	$('.logintrue').click();
	
	
   loginid=gdb['login']['mid'];
   loginaname=gdb['login']['aname'];
   userinfo['login_id']=gdb['login']['mid'];
   userinfo['aname']=gdb['login']['aname'];
   userinfo['islogin']=true;
   sys['fid']=loginid;
   
   
   
   
     gstate['login']=true;
	 $('.flogin').remove();
 var  pr={};
pr['sys']=getsys();


  doajax(null,'ss/initlogin.php',pr,function(r){


var rt = $.parseJSON(r);
$.each(rt, function(k, v){
userinfo[k]=v;	
$oj=$('._'+k);
if(isfound($oj)){
$oj.html(v);	
}
});

islogin=true;


});
}else{
}
break;

case 'regis':

break;
case 'sendmsg':

var $ichat=$('.ichatF');
var h=gettemplate('.msgitem');

h=h.replace(/@msg@/g,tval);
h=h.replace(/@uimg@/g,rt['uimg']);


$ichat.append(h);
$ichat.find('ichatF').removeClass('ichatF');

bottomscroll($('#pchatfeed'),100);
$t.val('');

break;
}

try{
	rpostex($t,r);
}catch(errx){}
}catch(err){ 
 var $div=$t.parent().find('.qreturn:eq(0)');
	if(!isfound($div)){
		$('<div class="qreturn"></div>').insertAfter($t);
		$div=$t.parent().find('.qreturn:eq(0)');
	}
  $div.html(r)
  .data('isbind','a');
   initall($div,function(){});
}




}
function replaceall(str, hash) {
	var keys = [], key;
	for (key in hash) {
		keys.push(key);
	}
	return str.replace(new RegExp(keys.join('|'), 'g'), function ($0) {
		return hash[$0];
	});
};

function cprfind($t,s1,s2){
var $oj=null;	
try {	
 
   $oj=cpr($t,s1);
 if(isfound($oj)){
   $oj=$oj.find(s2);
 }
 return $oj;
}catch(err){};
  return $oj;
}
function rload($t,$p,$poj) {
/*
	
try { 	

var $ojc=$p.parent().find('.init0r');
ojclick($ojc);


var $pjs=$poj.find('#jsondb');
if(isfound($pjs)){
	//$pjs.hide();
var $grd=$('#tdatagrid');
	var data = $.parseJSON($pjs.html());
	var tbl_row='';
	var tbl_body='';
	var i=0;
	$.each(data, function() {
        var tbl_row = "";
        $.each(this, function(k , v) {
            tbl_row += "<td><input type='text'    value="+v+" /></td>";
        })
        tbl_body += "<tr>"+tbl_row+"</tr>";    
		i+=1;
    })
	$grd.html(tbl_body);
}





var $rr=$('.fullsc:not(:hidden)');
if(isfound($rr)){
	//$('body').css('overflow','hidden');
}

var $r=$poj.find('.rload');
if(isfound($r)){
var fn=cstr($r.data('fn'));
switch(fn){
case 'seturl':
try {

var r=$r.attr('data-url');
    r.replace(/@fid@/g,r);

/*
if (typeof(window.history.pushState) == 'function') {
    window.history.pushState(null, path, path);
} else {
    window.location.hash = '#!' + path;
}


if(islogin){
//gurl='#'+r;

 //history.pushState("desction", "tile", gurl);
  //gurl='#'+r;
 //location.hash=gurl;
}

 

}
catch(err){
//location.hash=$r.attr('data-url');

}
//gurl=location.hash;

//gurlload=true;
break;
case 'fullsc':
//$('body').css('overflow','hidden');
break;
case 'wall':
var rid=$('.wallitem:first').data('rowid');
if(cstr(sys['arowid_wall'])==''){
sys['arowid_wall']=rid;
}
if(cstr(rid)>cstr(sys['arowid_wall'])){
sys['arowid_wall']=rid;
}
break;
}

}


if(!$t.hasClass('bypage')){
	
try{	
// page setup


var $pageinfo=$poj.find('.pageinfo');
if(isfound($pageinfo)){
	
var pr=str2pr($pageinfo.data('pageinfo'));
var $pcontrol=cprfind($poj,'.c-loopw','.pagecontrol');
var $pcmb;
var $dbpage=cpr($poj,'.c-loopw');
var h='';
var vtotalpage=parseInt(pr['totalpage']);
var vtotalrow=parseInt(pr['totalrow']);


// set page


var $dbg=cpr($t,'.dbgroup');
if(isfound($dbg)){
 $dbg.removeClass('dbgroupfound');
	
	
var $trnum=$dbg.find('.dbtotalrownum');

}



if(!isfound($pcontrol)){
   $pcontrol=cprfind($poj,'.dbgroup','.pagecontrol');  
   $dbpage=cpr($poj,'.dbgroup');
}






if(isfound($pcontrol)){

    if(vtotalpage>0){
     if(isfound($dbpage)){
	    $dbpage.addClass('dbgroupok');
	 }
	}

   $pcontrol.empty();
   for (i=0; i < vtotalpage; i++)
   {
	 if(i>0){
	  $poj.append(createprivatepage(i,$t));
	 }
	 $pcontrol.append('<a class="pagenum">'+cstr(i+1)+'</a>');
   }
   $pcontrol.find('.pagenum:first').addClass('pagenumF');
   
   
   
if(isfound($pcontrol)){
	h='<select class="cmbpagenumber" >';
    for (i=0; i < vtotalpage; i++){
    h+='<option value="'+cstr(i+1)+'">'+cstr(i+1)+'</option>';
    }
	h+='</select>';
    $pcontrol.prepend(h);
	$pcontrol.data('isbind','a');
	

}

   
   
   // setting for allow rebind event
   $pcontrol.data('isbind','a');
   initall($pcontrol,function(){
   });
   
   var $pcbox=$dbg.find('.pagecontrolbox');
   if(isfound($pcbox)){
   $pcbox.show();
   }
   
   
}else {
}

// show page first only
 $poj.find('.privatepage').hide();
 $poj.find('.privatepage:first').show();
$pageinfo.remove();
}



}catch(err){
	//alert('setup page error.'+err);
}

}





var d=arrurl(cstr($t.data('dpr')));
switch(d['tag']){
case 'app':
var ilen=$('.fullsc:not(:hidden)').length;

//history.pushState(d['appid'],d['appid'],'app/'+d['appid']);

if(ilen > 0){
//$('body').css('overflow','hidden');
}
$p.find('.app').hide();

if(isfound($poj)){
   $poj.show();
}



$('#desktop').hide();
$(document).scrollTop(0);
break;

case 'login':

if(gstate['login']){
  $('.login-aname').html(gdb['login']['aname']);
  $('.login-mid').html(gdb['login']['mid']);
  gstate['login']=true;
}
break;

}


}catch(err){alert('rload error  '+err);}

*/
}



function getcheckbox($oj){
	return $oj.prop('checked');
 //return $oj.attr('checked') ? 1 : 0;
}
function getcheckboxnum($oj){
return $oj.prop('checked') ? 1 : 0;
}


function setcheckbox($oj,v){
if(v=='true'||v=='1'||v=='y'){
    $oj.attr('checked',true);
}else{
    $oj.attr('checked',false);
}
}
function getdataform($frm){
try { 



var s={};

//  notmal input
var otype='';
var oname='';
var otag='';
var $t;
var isallow=true;
$frm.find('input:not(input[type=button], input[type=submit], input[type=reset]), textarea, select').each(function(){
$t=$(this);	
isallow=true;
if($t.hasClass('nullinput')){
isallow=false;
}


if($t.hasClass('qnohide')){
if($t.is(":hidden")){
  isallow=false;
}
}


oname=cstr($t.attr('name'));	

/*
if(oname.replace("[]","")!=oname){
if(isallow){
  if(!$t.hasClass('_isselect')){
	 var $oj=$frm.find('[name="'+oname+'"]');
	 
	     $oj.each(function(){
		   alert('call loop');
		  });
  }	
}}
*/


if(isallow){
if( oname!=''){

otype=cstr($t.attr('type')).toLowerCase();	
switch(otype){
case 'checkbox':
 s[oname]=getcheckboxnum($(this));
break;
default:
if($(this).hasClass('vals')){
 s[oname]=$(this).data('vals');
}else {
 s[oname]=$(this).val();
}
break;
}}}	
});




var $t;
var tg='';
var arr;
var tagname='';
var a={};

$frm.find('[data-input]').each(function(){
										
  $t=$(this);
  tg=$t[0].tagName.toLowerCase();
  tagname=cstr($t.attr('data-input'));
  
switch(tg){
case 'img':
arr=str2pr(cstr($t.data('input')));
if(cstr(s[tagname])==''){
 s[tagname]=$t.attr('src');
}else {
 s[tagname]=s[tagname]+'|'+$t.attr('src');
}
break;
}  
});

//  usercontrol input 
var $ojimg;
var sarr=[];
$frm.find('.arayimg').each(function(){
  $ojimg=$(this);
  sarr=[];
  $ojimg.find('img').each(function(){
	 	sarr.push($(this).attr('src'));						   
  });
  s[$ojimg.data('name')]=sarr;
});

// virtual input 
var name='';
$frm.find('[data-vval]').each(function(){
 name=cstr($(this).data('name'));	
 if(name!=''){
   s[name]=$(this).attr('data-vval');
 }

});

var $oj;
var val='';

$frm.data('isallow',true);
$frm.find('[required]').each(function(){
  $oj=$(this);
  $oj.removeClass('isalert');
  val=cstr($oj.val());
  
  if(val==''){
    $oj.addClass('isalert');
    $frm.data('isallow',false);
  }
});
 return s;
}catch(err){ alert('get data from error'+err);}
}




function str2pr(s){
try{ 	

s=cstr(s);
if(s==''){
return '';
}

	
if(s.substr(0,1)=='&'){
var il=s.split('|').length;
if(il==1){
  d=arrurl(s);
  return d;
}else {
var arr=[];
$.each(s.split('|'), function( key, value ) {
  arr.push(arrurl(value));
});
return arr;
}
}else {
  d = eval(s);
}
return d;

}catch(err){
}
return '';

}


function getdatapr($t,attr){
var s=cstr($t.data(attr));
if(s.substr(0,1)=='&'){
var il=s.split('|').length;
if(il==1){
  d=arrurl(s);
  return d;
}else {
var arr=[];
$.each(s.split('|'), function( key, value ) {
  arr.push(arrurl(value));
});
return arr;
}
}else {
  d = eval($t.data(attr));
}
return d;
}

function getpr($t){
var s=cstr($t.data('a'));
if(s.substr(0,1)=='&'){
var il=s.split('|').length;
if(il==1){
  d=arrurl(s);
  return d;
}else {
var arr=[];
$.each(s.split('|'), function( key, value ) {
  arr.push(arrurl(value));
});
return arr;
}
}else {
  d = eval($t.data('a'));
}
return d;
}

function getkeyseq(){
kseq+=1;
var m = cnum(new Date().getTime());
var r=cstr(getcookie('loginid'))+'_'+m+kseq;
return r;
}
function  gett(){
 timeseq+=1;
return timeseq;
}
function ojgroup($t){
	
var stype='';	
var ojtype=cstr($t.attr('type'));
switch(ojtype){
case 'text':
stype='text';
break;
case 'textarea':
stype='text';
break;
}
return stype;
}

function cpr_tag($oj,tagname){
if($oj[0].tagName.toLowerCase()!=tagname){
    return  cpr_tag($oj.parent(),tagname);
 }
 return $oj;
}
function getojtag($t){
return $t[0].tagName.toLowerCase()+cstr($t.attr('type')).toLowerCase();
}
function getojval($t){
  if(getojtag($t)=='inputcheckbox'){
    return getcheckboxnum($t);
  }	
  return $t.val();
}
function addojval(st,$t){
   st[$t.attr('name')]=$t.val();						   
}
function setjval($o,v){
try{
if(isfound($o)){
$o.val(v);
}
}catch(e){}
}
function setojval($tx,v){
var $t;	
$tx.each(function(){
$t=$(this);
try{
var otype=getojtag($t);

switch(otype){
case 'inputcheckbox':
setcheckbox($t,v);
break;
case 'inputdate':
      $t.val(v);
break;
case 'img':
try{
$t.attr('src',v);	
}catch(e){}
break;
default:
if($t.is(':input')){
      $t.val(v);
}else{
      $t.html(v);
}
break;
}	
}catch(err){
		alert(' set oj value.error'+err);
}

});		
}
function isbind($o){
if($o.data('isbind')!=true){
   $o.data('isbind',true);
 return true;
}else {
	
switch( cstr($o.data('rebind'))){
case 'r':
$o.data('isbind','');
return true;
break;
case 'a':
return true;
break;
}
}
return false;
}
function cpr($t,cin){
  try{
	  
  var c=cin;	  
  c=c.replace('.','');	 
  var cprloop=cint($t.data('cprloop'))+1;	
  $t=$t.parent();
  $t.data('cprloop',cprloop);
  if(!isfound($t) ){
    return null;
  }
  if($t.hasClass(c)){
	  return $t;
  }else{
	  if('#'+cstr($t.attr('id'))==cin){
	   return $t;
	  }
	  return cpr($t,c);
  }
  
  
  }catch(err){onerror('cpr > click',err);}
}

function gpost(s){
var alld=s.split('&');
var v;
var col={};
$.each(alld, function(index, value){
if(value!=''){
v=value.split('=');
col[v[0]]=v[1];
}
});
return col;
}





// animate 

function clearanimate($o){
    $o.clearQueue();
    $o.stop();
}
function topscrollex($o,speed,callb){
	   clearanimate($o);
       $o.animate({
       scrollTop: 500
       }, speed,function(){
	     callb();
	  });
}
function topscroll($o,speed,callb){
	   clearanimate($o);
       $o.animate({
       scrollTop: 0
       }, speed,function(){
	     callb();
	  });
}
function bottomscroll($o,speed){
if(isfound($o)){	
	   clearanimate($o);
       $o.animate({
       scrollTop: $o.get(0).scrollHeight
       }, speed);
}
}
function gettemplate(s){

var tp='';
var $oj=$('#tpstore');
tp=ojhtml($oj.find(s));
return tp;
}

// custom function 

function cmd($t){
	
var d=str2pr(cstr($t.data('inf')));
if($t.hasClass('_cmd')){
switch(d['cmd']){
}
}
}




function cfocus($t)
{
	
	
var $tt=$t.parent();
var d=cstr($tt.data('fclassinfo'));
if(d!=''){
d=d.split(',');
if(!(d[0]==''||d[0]=='t'||d[0]=='this')){
  $tt=cpr($t,d[0]);
}
if($tt.isfound()){
 $tt.find('.'+d[1]+'F').removeClass(d[1]+'F');
  $t.addClass(d[1]+'F');
}}

}
function psound(){
try{	
 sound_msgin.play();
}catch(err){};
}



function woschatlist($tin,d){
 try { 

var fid=d['fid'];

 if($tin.hasClass('chatlistitemin')){
	var $o=$('.chatlistitem[data-mid="'+fid+'"]');
	if(isfound($o)){
		$o.click();
		$tin.remove();
	
	}else {
		
		alert('plaese update chat list ');
	   $('.updatechatlist').click();
	}
     return ;
 }


var $t=$('.chatlistitem[data-mid="'+fid+'"]');
    $t.addClass('isconnect');
var $pf=$('#pchatfeed');
var $p;
var from=loginid;
var pmsgc='';



if( cnum(from) > cnum(fid) ){
	pmsgc=from+'_'+fid;
}else {
	pmsgc=fid+'_'+from;
}



var $p=$pf.find('#'+pmsgc);
if(!isfound($p)){
 $pf.append('<div  class="ichat" id="'+pmsgc+'">xxx</div>');
 $p=$pf.find('#'+pmsgc);
}



$pf.find('.ichatF').removeClass('ichatF');
$pf.find('.ichat').hide();
$p.show();
$p.addClass('ichatF');


if($p.data('state')!=1){
	cpr($pf,'.gg').find('.chatenter:first').click();
    $p.data('state',1);
}

sys['chatmid']=fid;
 $t.removeClass('msgread0');
  bottomscroll($('#pchatfeed'),100);
 					
}catch(err){alert('chat list'+err);}
}


function showmsg(fn,msg)
{
	
}

function plusnum($oj){
try {
$oj.html( cnum($oj.html())+1 );
}catch(err){};
}






function geturll(d,il){
var s='';	
for(var i=0; i<il; i++){
	s+=d[i]+'/';
}
if(s!=''){
s=rcut(s);
}
return s;
}
function url2arr(s) {
try {	
if(s.contains('?')){
   s=cstr(s.split('?')[1])
}

if(s.substr(0,1)!='&'){
s='&'+s;
}

    s=cstr(s);
    var vars = {};
    var parts = s.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
	
}catch(err){alert('f:url2arr error'+err);};
}


function cal_fileupload($g){
try{	
var sall={};
		var s1='';
		var sx='';
		var defimg='';
		$g.find('.upload_row').each(function(){
		   $tx=$(this);
		   sx=cstr($tx.data('d'));
		   s1=sx.split(',');
		   sall[s1[0]]=lcutn(sx,s1[0].length+1);
		   if(defimg==''){
			 defimg=lcutn(sx,s1[0].length+1);
		   }
		});
	s1=jcstr(sall);
	if(s1=='{}'){
	 s1='';
	}
$g.find('.kupload:first').val(s1);	
var $cupload=$g.find('#cupload');
var inf=url2arr(cstr($cupload.data('inf')));
if(inf['defimg']!=''){
var $g1=cpr($g,'.g_bind');

if(cstr(inf['defimg'])!=''){
  $oj=$g1.find('.cell_val'+cstr(inf['drk'])+'[name="'+cstr(inf['defimg'])+'"]');
  if($oj.isfound()){
    $oj.val(defimg);
  }else {
   alert('.cell_val'+cstr(inf['drk'])+'[name="'+cstr(inf['defimg'])+'"]');
   $g1.css('background-color','red');
 }}
 
 
}
}catch(e){
}
}


function getguid(){
 return guid();
}
function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function arr2url(d) {
try {	

var s='';
$.each(d, function(k,v) {
	s+='&'+k+'='+v;			   
				   
});
return s;
}catch(err){alert('f:url2arr error'+err);};
}



function initcontrolui($fm_){
try {	
$fm_.find('.setcenter').each(function(){
var $ojc=$(this);
 if($ojc.data('issetcenter')!=true){
    //$ojc.data('issetcenter',true);
    w=-1*$ojc.width()/2;
    h=-1*$ojc.height()/2;   
  
	$ojc.css('position','fixed');
	$ojc.css('top','50%');
	$ojc.css('left','0');
	$ojc.css('width','100%');
	$ojc.css('margin-top',h);
	$ojc.css('margin-left',0);
}
});


// form config 
var $oj;
$fm_.find('.cmb_initnull').each(function(){
$oj=$(this);
$oj.prepend('<option value="">-all-</option>');	
$oj.removeClass('cmb_initnull');
$oj.val('');
});

// form config 
var $tr;
$fm_.find('[required]').each(function(){
$tr=$(this);
	$('<a class="maskrequire">*</a>').insertAfter($tr);
});

// form config 

var val;
$fm_.find(':input').each(function(){
  val=cstr($(this).val());
 if(val.indexOf('@') == 0 && (val.lastIndexOf('@') == val.length-1)){
	$(this).val('');
  }
});
}catch(e){
   alert('initcontrolui.error.'+e);
}
}
