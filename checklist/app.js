$( document ).ready(function() {
	
  // $.cookie('name', 'test');
  // $.cookie('name'); // => "value"
  
  function alert2(o){
	alert(JSON.stringify(o));
  }
  function startwait(){
     $('#waiting').show();
  }
  function endwait(){
     $('#waiting').hide();
  }
//VVVVVVVVVVVVVVVVVVVVVVVVVV Question VVVVVVVVVVVVVVVVVVVVVVVVVV//   
$('.questionitem').bind('click',function(){
  var cookie=$.cookie('loginid');
  if(cookie==undefined){
  	//alert('xxx');
	$('.loginitem').click();
  }else{
	//alert(b);
  $('.main').slideToggle( "fast", function() {
	$(".topmain").hide();
	$(".lowmain").hide();
	$('body').css("background-color", "white");
	startwait();
    $( "#panelc" ).load("load.php", function() {
	  //$("#headid").hide();
	  endwait();
	  
	  $("#outletid" ).val($.cookie('outletid'));
	  $("#empid" ).val($.cookie('loginid'));
			
	  $("#panelc" ).show();		   
	  $(".ggroupbox").hide();
	  //$(".gitembox").hide();
	  //$(".gitem").hide();	
	  
	  $('.gdepart').bind('click',function(){
		 $(this).parent().find('.ggroupbox').slideToggle();
	  });
	  
	  
	  $('.gtopic').bind('click',function(){
		 $(this).parent().find('.gitembox').slideToggle();
	  });
	  
	  /*$('.critical').bind('click',function(){
		  alert($(this).attr('data-topicid'));
	  });*/
	  
      $('.addbox').bind('click',function(){
			   
			  //var $checks = $(this).val();
		  	  //alert($checks);
			 $(this).parent().parent().find('.divother').css("display","inline-block");
			  
			 var sum=0;
			 var $input=$(this).parent().parent().parent().parent().find('.scoretopic');
			 var ival=parseInt($input.data('val'));
		 
			  $(this).parent().parent().parent().find('.addbox').each(function(){
				  var $checks = $(this).val();
		  	  	  //alert($checks);
				  if (!$(this).is(":checked"))
				  {
					  sum+=parseInt($(this).val());
				  }
			  });
			  
            ival=ival-sum;
			if(ival<0){ival=0;}
			$input.val(ival);
		  
	  });		

	  $('#bsubmit').bind('click',function(){
		  if (confirm("คุณต้องการบันทึกหรือไม่!") == true) {
			//alert("You pressed OK!");
			
		    var $lists=$('.scoretopic');
			//$lists.css('background-color','red');
			var $list;
			var vals={};
			
			var isallow=true;
			
			$lists.each(function(){
			    $list=$(this);
				vals[$list.attr('data-topicid')]=$list.val();
				if($list.val()==''){
				  isallow=false;
				}
			});
			
			var $criticals=$('.critical');
			var $critical;
			var risk={};
			
			$criticals.each(function(){
			    $critical=$(this);
				risk[$critical.attr('data-topicid')]=$critical.val();
				if($critical.val()==''){
				  //isallow=false;
				}
			});
			
			var $checks=$('.addbox');
			var $check;
			var $checkid;
			var point={};
			var pointid={};
			
			$checks.each(function(){
			    $check=$(this);
				point[$check.attr('data-itemid')]=$check.prop('checked');
			
				$checkid=$(this);
				pointid[$check.attr('data-itemid')]=$checkid.attr('data-topicid');
				if($check.val()==''||$checkid.val()==''){
				  isallow=false;
				}
			});
			
			//alert2 (point);
			
			var $others=$('.divother');
			var $other;
			var etc={};
			
			$others.each(function(){
			    $other=$(this);
				etc[$other.attr('data-itemid')]=$other.find( ":input" ).val();
				if($other.val()==''){
					$other=0;
				  //isallow=false;
				}
			});
			
			var pr={};
			var outletid=$('#outletid').val();
            var empid=$('#empid').val();
			var usernameid=$.cookie('username');
			var ansid = $.cookie('loginid');
			
			var rowhead=$('#rowhead').val();
			
			if(outletid==''||empid==''){
			  isallow=false;
			}
			
			pr['list']=vals;
			pr['critical']=risk;
			pr['check']=point;
			pr['checkid']=pointid;
			pr['other']=etc;
			pr['outletid']=outletid;
			pr['empid']=empid;
			pr['username']=usernameid;
			pr['loginid']=ansid;
			pr['rowhead']=rowhead;
	
			//alert2 (pr['checkid']);
			//alert(pr['rowhead']);
			
						
			startwait();	 
			if(isallow){
			   $.ajax({
				   type: 'POST',
				   url:'savecheckpoint.php',
				   data:pr,
				   dataType: "text",
				   success: function(data){
					   alert('success'+data);
					   endwait();
                   },
				   error:function (xhr, ajaxOptions, thrownError){}
			   });
			   $('#btnhome').click();
			 
		 	   /*$(".showtxt" ).load( "savecheck.php",pr, function() {
				
			     endwait();
				 alert('save complate');
			 });
			 */
			}else{
				endwait();
				alert('Save Failed');
			}
			
		  } else {
			//alert("You pressed Cancel!");
		  }	
      });
		if ($('#back-to-top').length) {
			var scrollTrigger = 100, // px
				backToTop = function () {
					var scrollTop = $(window).scrollTop();
					if (scrollTop > scrollTrigger) {
						$('#back-to-top').addClass('show');
					} else {
						$('#back-to-top').removeClass('show');
					}
				};
			backToTop();
			$(window).on('scroll', function () {
				backToTop();
			});
			$('#back-to-top').on('click', function (e) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: 0
				}, 100);
			});
		}
    });
  });
  }  
});
   
//VVVVVVVVVVVVVVVVVVVVVVVVVV Report VVVVVVVVVVVVVVVVVVVVVVVVVV//
$('.reportitem').bind('click',function() {
  var cookie=$.cookie('loginid');
  if(cookie==undefined){
  	  $('.loginitem').click();
	  endwait();
  }else{
	  $('.main').slideToggle( "fast", function() {
		  startwait();
		  $(".topmain").hide();
		  $(".lowmain").hide();
		  $('body').css("background-color", "white");
		  $('#panelc').load('report-forms.php', function(){
			  endwait();
			  $( "#panelc").show();
			  function report(a) {
					//a*=10;
					//alert(a);
				  $("#panelc" ).load("report.php", function() {
				  $(".scrollTo" ).hide();
				  $(".show1" ).hide();
				  $('#button_search').bind('click',function() {
					$(".show1" ).show();
					function tchecklist(t) {
						//$('#moveshow2').click();
						$('.show_datarow').bind( "click", function(){
						  
						  var rowid=$(this).attr('rowid');
						  var row=$(this).attr('row');
						  var pr={};
						  pr['rowid']=rowid;
						  pr['row']=row;
						  
						  //alert(pr['rowid']);
						  $(".scrollTo" ).show();
						  $(".r_search" ).hide();
						  $(".show1" ).hide();
						  $(".r_show1" ).hide();
						  $(".r_top" ).hide();
						  $(".font-Montserrat" ).hide();
						  $(".hide-wait" ).show();
						  
						  $('.close-thik').bind('click',function() {
							  $(".scrollTo" ).hide();
							  $(".r_search" ).show();
							  $(".show1" ).show();
							  $(".r_show1" ).show();
							  $(".r_top" ).show();
							  $(".font-Montserrat" ).show();
							  $(".clear").remove();
							  $(".r_show2").empty();
						  }); 
						  
						  if(a==1){
							  $(".r_show2" ).load( "showreport-score1.php",pr, function() {
								  $(".hide-wait" ).hide();
								  
							  });
						  }else if(a==2){
							  $(".r_show2" ).load( "showreport-score2.php",pr, function() {
								  $(".hide-wait" ).hide();
								  //$(this).find($(".r_scroll")).css("background-color","rgba(251,94,96,1.00)");
								 
							  });
						  }else if(a==3){
							  $(".r_show2" ).load( "showreport-score3.php",pr, function() {
								  $(".hide-wait" ).hide();
								 
							  });
						  }else if(a==4){
							  $(".r_show2" ).load( "showreport-score4.php",pr, function() {
								  $(".hide-wait" ).hide();
								  $(this).parent().find('#btnExcel').css("display","none");
							
								  // Get the modal
							      var modal = document.getElementById('myModal');
						
							      // Get the image and insert it inside the modal - use its "alt" text as a caption
							      var images = document.getElementsByClassName('myImg');
							      var modalImg = document.getElementById("img01");
							      var captionText = document.getElementById("caption");
							      function openModel(){
								      modal.style.display = "block";
								      modalImg.src = this.src;
								      modalImg.alt = this.alt;
								      captionText.innerHTML = this.alt;
							      }
							      for(var img = 0; img < images.length; img++) {
								    images[img].onclick = openModel;
							      }
						
							      // Get the <span> element that closes the modal
							      var span = document.getElementsByClassName("close")[0];
						
							      // When the user clicks on <span> (x), close the modal
							      span.onclick = function() {
								      modal.style.display = "none";
							      }
								  
							  });
						  }else if(a==5){
							  //alert('ddd');
							  $(".r_show2" ).load( "showreport-score2.php",pr, function() {
								  $(".hide-wait" ).hide();
								  $(this).parent().find('#btnExcel').css("display","none");
								 
							  });
						  }else{
							  alert('ยังไม่มีข้อมูล');
						  }
						});
					}
					var pr={};
						var input_outlet=$('#input_outlet').val();
						var input_date1=$('#input_date1').val();
						var input_date2=$('#input_date2').val();
						//var input_user=$('#input_user').val();
						
					/*	if(input_outlet==''||input_date1==''||input_date2==''){
				  			isallow=false;
						}*/
						
						pr['input_outlet']=input_outlet;
						pr['input_date1']=input_date1;
						pr['input_date2']=input_date2;
						//pr['input_user']=input_user;
						
					if(a==1){
						//alert('เงื่อนไขที่ 1');
						pr['input_sumfalse']=0;
						$( ".r_show1" ).load("showreport-head.php",pr, function(){
							$(".del_row" ).hide();
							tchecklist();
						});
					}else if(a==2){
						//alert('เงื่อนไขที่ 2');
						pr['input_sumfalse']=1;
						$( ".r_show1" ).load("showreport-head.php",pr, function(){
							$(".del_row" ).hide();
							tchecklist();
						});
					}else if(a==3){
						//alert('เงื่อนไขที่ 3');
						pr['input_sumfalse']=0;
						$( ".r_show1" ).load("showreport-head.php",pr, function(){
							$(".del_row" ).hide();
							tchecklist();
						});
					}else if(a==4){
						//alert('เงื่อนไขที่ 4');
						$( ".r_show1" ).load("showreport-pic.php",pr, function(){
							tchecklist();
						});
					}else if(a==5){
						//alert('เงื่อนไขที่ 5');
						pr['input_sumfalse']=0;
						$( ".r_show1" ).load("showreport-head.php",pr, function(){
							tchecklist();
							$('.del_datarow').bind( "click", function(){
								if (confirm("แน่ใจนะว่าจะลบ!") == true) {
									//alert("You pressed OK!");
								
									var rowid=$(this).attr('rowid');
									var row=$(this).attr('row');
									var usernameid=$.cookie('username');
									var ansid = $.cookie('loginid');
									
									var pr={};
									pr['refid']=rowid;
									pr['row']=row;
									pr['username']=usernameid;
									pr['loginid']=ansid;
									alert('คุณต้องการลบ'+pr['refid']);
									
									startwait();
									$.ajax({
									   type: 'POST',
									   url:'updatecheckpoint.php',
									   data:pr,
									   dataType: "text",
									   success: function(data){
										   alert('success'+data);
										   endwait();
										   $('#btnhome').click();								   },
									   error:function (xhr, ajaxOptions, thrownError){}
									});
								} else {
									//alert("You pressed Cancel!");
								}
							});
						});
					}else{ 
						alert('ยังไม่มีข้อมูล');
					}
						
				  });
				});
			  }
			  $('#forms1').bind('click',function() {
				  report(1);
			  });
			  $('#forms2').bind('click',function() {
				  report(2);
			  });
			  $('#forms3').bind('click',function() {
				  report(3);
			  });
			  $('#forms4').bind('click',function() {
				  report(4);
			  });
			   $('#forms5').bind('click',function() {
				  report(5);
			  });
		  });
	  });
  }
});

//VVVVVVVVVVVVVVVVVVVVVVVVVV System VVVVVVVVVVVVVVVVVVVVVVVVVV//
$('.systemitem').bind('click',function() {
  var cookie=$.cookie('loginid');
  if(cookie==undefined){
  	  //alert('xxx');
      $('.loginitem').click();
  }else{
	  //alert(b);
	  $('.main').slideToggle( "fast", function() {
		$( "#panelc" ).load("system.php", function() {
			$( "#panelc").show();
			$(".topmain").hide();
			$(".lowmain").hide();
			$('body').css("background-color", "white");
			$("#outletid" ).val($.cookie('outletid'));
			$("#empid" ).val($.cookie('loginid'));
			
			$('#fileToUpload').bind('click',function() {
				var pr={};
				var outletid=$('#outletid').val();
            	var empid=$('#empid').val();
				
				pr['outletid']=outletid;
				pr['empid']=empid;
				
				$(".timeshow" ).load("loadtime.php",pr, function() {});
			});
			
			$('#uploadpic').bind('click',function() {
				
			  $('#uploads').click();
			  
			  var $pic=$('#fileToUpload').val();
			  var $comment=$('#comment').val();
			  var $timeupload=$('#timeupload').val();
			  var outletid=$('#outletid').val();
              var empid=$('#empid').val();
				
			  var pr={};
			  pr['comment']=$comment;
			  pr['picname']=$pic;
			  pr['picid']=$timeupload;
			  pr['outletid']=outletid;
			  pr['empid']=empid;
			  
			  alert(pr['comment']+pr['picname']+pr['timepic']);
			  
			  $.ajax({
				   type: 'POST',
				   url:'saveupload.php',
				   data:pr,
				   dataType: "text",
				   success: function(data){
					   alert('success'+data);
					   endwait();
                   },
				   error:function (xhr, ajaxOptions, thrownError){}
			  });
			  
			});	
		});  
	  });
  }
});
//VVVVVVVVVVVVVVVVVVVVVVVVVV Login VVVVVVVVVVVVVVVVVVVVVVVVVV//
$('.loginitem').bind('click',function() {
  var cookie=$.cookie('loginid');
  if(cookie==undefined){
	   $('.main').slideToggle( "fast", function() {
		   $(".topmain").hide();
		   $(".lowmain").hide();
		   $('body').css("background-color", "white");
		$( "#panelc" ).load("login.php", function() {
		  $("#panelc" ).show();
		  $('#login').bind('click',function() {
			
			var isallow=true;
			var pr={};
				var sect=$('#sect').val();
				var username=$('#username').val();
				var password=$('#password').val();
				
				
				if(sect==''||password==''||username==''){
				  isallow=false;
				}
				
				pr['sect']=sect;
				pr['username']=username;
				pr['password']=password;
				
				
			/*$.ajax({
					type: 'POST',
					url:'load.php',
					data:pr,
					dataType: "text",
					error:function (xhr, ajaxOptions, thrownError){}
			});*/
				
				//alert(pr['username']+pr['password']+pr['sect']);
			
			if(isallow){	
			$( ".i_show" ).load("showlogin.php",pr, function() {
				var text=$(".i_show").text();
				
				var js = jQuery.parseJSON(text);
				
				  $.cookie('loginid', js["loginid"]);
				  $.cookie('outletid', js["outletid"]);
				  $.cookie('username', js["username"]);
				  
				  //$.cookie('loginid');
				  //alert($.cookie('loginid'));
				var ansid = $.cookie('loginid');
				 //alert(ansid);
				 if(ansid == undefined){
					 alert('Username Password incorrect.');
					 $(this).parent().parent().find('.tryagain1').css("display","none");
					 $(this).parent().parent().find('.tryagain2').css("display","inline-block").css("background-color","#ff656c");
				 }else{
					 $(this).parent().parent().find('.tryagain1').css("display","none");
					 $(this).parent().parent().find('.tryagain2').css("display","none");
					 $('#btnhome').click();
					 window.location.reload();
				 }
				  
				//alert(js["loginid"]);
			})
			}else{
				alert('Failed');
				$(this).parent().parent().find('.tryagain2').css("display","none");
				$(this).parent().parent().find('.tryagain1').css("display","inline-block").css("background-color","#ff656c");
			}
	
		  });
		  
		});  
	   });
  }else{
	  	$('.main').slideToggle( "fast", function() {
			$(this).parent().find('.confirm').css("display","inline-block");
        });
	  	//alert($.cookie('loginid'));
		//alert($.cookie('outletid'));
		//alert($.cookie('username'));
		//alert('logout successful');
		//$('.loginitem').click(); 	
  }
});

//VVVVVVVVVVVVVVVVVVVVVVVVVV Home VVVVVVVVVVVVVVVVVVVVVVVVVV//
$('#in').bind('click',function(){
	$('#btnhome').click();
	//$(this).parent().parent().parent().find('.confirm').css("display","none");
});
$('#out').bind('click',function(){
	$.removeCookie('loginid');
	$.removeCookie('outletid');
	$.removeCookie('username');
	window.location.reload();
});

$("#empname" ).val($.cookie('username'));
$('#btnhome').bind('click',function(){
  $('body').css("background-color", "#060613");
  $( "#panelc").hide();
  $(".topmain").show();
  $(".lowmain").show();
  $(this).parent().parent().parent().parent().find('.confirm').css("display","none");
  $('.main').slideToggle( "fast", function() {
	  
  });  
  
});


});
