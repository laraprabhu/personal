 
//---------Global Declarations
var HasSwiped = true;
var xMouseX,xMouseY;
var xReverse=false;
var xAttempt =0;
var Timer=null;
var xMouseDown=false;
var xMonitorMouseDown=false;
var xStarted=false;
var xCompleted=false;
var xKeyDown=false;
var xCarMoved=false;
var xOpValue=0;
var xNewX = 0;
var xNewLeft = 0;


$(document).ready(

	function()
	{

        //--------Setting Window Height.
	$("#DivContentWrapper").hide();
	$("#DivPreLoader").show();

	$(window).bind("load resize", function(event)
		{
			if(event.type == "load")
				{
					$("#DivPreLoader").hide();
					$("#DivContentWrapper").fadeIn(1000);
					$("#DivImage").height($(window).height());
					$("#DivDollar").css({"left": ($("#DivImage").width() * 50/100)-30 , "top" : $("#DivImage").height() * 48/100 });
					$("#LiCurrent").addClass('LiBorder');
					DoCycles(); //For Dollar
					DoCycles_I(); //For Notes
					InitialDropsSetup(); //For faucet animation

					//For the Extra's button
					$(".previous").css({"width": 75,"height": 20,"top": ($(window).height()/2) - (187 - 20),"left": ( ($(window).width()/2) - (200) ),"position": "absolute"});				
					$(".next").css({"width": 75,"height": 20,"top": ($(window).height()/2) - (187 - 20),"left": ( ($(window).width()/2) - (175) ) + 300,"position": "absolute"});												

				}

			$("#DivHome,#DivBasement,#DivCapabilities,#DivWorks,#DivExtras,#DivBackgroundHolder").height($(window).height());
			
			$("#DivBasement > div").each(function(){ $(this).css(SetOffset()); });
			
			$("#DivOverView").css({"left": ($("#DivBasement").width()/2)-($("#DivOverView").width()/2),"top": ($("#DivBasement").height()/1.9)-($("#DivOverView").height()/2)});
							
			
		}
	);

	$(document).bind('selectstart dragstart', function(evt)
  		{ evt.preventDefault(); return false; });
	

	//-------For Map

		var map1 = new GMap2(document.getElementById('DivMap1'));
		var map2 = new GMap2(document.getElementById('DivMap2'));
        	var xLoc1 = new GLatLng(9.627378,77.868641);
		var xLoc2 = new GLatLng(8.776471,77.619947);
        	map1.setCenter(xLoc2, 11);
		map2.setCenter(xLoc1, 11);
		
		
       
	//-------For Doodle

 	
	function DoCycles()
		{
			if(xStarted==false)
				{
					$("#DivDollar").animate({"left": "+=10"},500,function(){ $("#DivDollar").animate({"left": "-=10"},500,function(){ DoCycles(); }); });
				}
			else
				{
					return false;
				}
		}

	function DoCycles_I()
		{
			if(xCarMoved==false)
				{
					
					$("#DivKeys").animate({"opacity": (xOpValue==0)?1:0 },1000,function(){ DoCycles_I(); });
					xOpValue = (xOpValue==0)?1:0;

				}
			else
				{
					$("#DivKeys").hide();
					return false;
				}
		}


	$("#DivImage,#DivDollar").mousemove(function(e)
					{


					var xLeft= parseInt($("#DivDollar").offset().left); 
					var xRight= parseInt($("#DivDollar").offset().left) + parseInt($("#DivDollar").width());
					var xTop= parseInt($("#DivDollar").offset().top);
					var xBottom= parseInt($("#DivDollar").offset().top) + parseInt($("#DivDollar").height());
					xMouseX=e.pageX;
					xMouseY=e.pageY;
					
					// For Ex: rnd between 50 - 100, do rnd(100-50) +50 | and here 80 added cuz, 50 ht of dollar and 70 height of footer -40 bottom margin.
					var xAnimateAdjustedTop = [parseInt($("#DivImage").height()) - 80 ] - [parseInt($("#DivHeader").height()) ] ;
					var xAnimateAreaBottom = parseInt($("#DivHeader").height());
					
								
					if(xReverse==false)

						{
										
							var xRndY = Math.floor(Math.random() * xAnimateAdjustedTop) + xAnimateAreaBottom;
							var xRndX = Math.floor ( Math.random() *  ( parseInt($("#DivImage").offset().left) + parseInt($("#DivImage").width()) - 50 ));

							if(xAttempt>=2 && $("#DivSkillMeter").css('display') == 'none' && xCompleted==false)
								{
									$("#DivSkillMeter").fadeIn(1900);
									$("#SpData").text("Tip: Use the above skill o'meter to improve your skills");
									$("#SpData").css({"top": $("#DivSkillMeter").offset().top + $("#DivSkillMeter").height() + 15 ,"font-size": 18 });
									$("#SpData").fadeIn(1900);
									$("#DivDollar").hide();
								}
							
					
							if ( xMouseY >= xTop &&
		     					xMouseY <= xBottom &&
		     					xMouseX >= xLeft && 
		     					xMouseX <= xRight )
								{
									if(xStarted == false)
										{
											$("#SpData").fadeOut(900);
											xStarted=true;
										}
									
									$("#DivDollar").stop().animate({"left": xRndX,"top": xRndY },{duration:700,easing:"easeInOutExpo",complete : function(){ xAttempt+=1; }});	
								}
						}
					else
						{
							
							if ($(this).attr("id")!="DivDollar")
								{
									xMouseY= (xMouseY > [parseInt($("#DivImage").height()) - 50 ]) ?
											    [parseInt($("#DivImage").height()) - 50 ] : xMouseY; 

									 $("#DivDollar").stop().animate({"left": xMouseX,"top": xMouseY },{duration:700,easing:"easeInExpo"});	
								}
						}
											
					}

	);

	
	//--------Moving Skill Bar

	$("#DivButton").bind("mousedown mouseup", function(e) 
							{
							
								xMouseDown=(e.type=="mouseup") ? false : true;
								  
							} 
			    );

	Timer=setInterval(function() 
				{ 
					if(xMouseDown==true)
						{ 
							if($("#DivSkillBar").height() >= 180) 
								{ 
									clearInterval(Timer);  
									$("#DivSkillBar").effect( "highlight",{ color:"#0C9A39" }, 1500);
									$("#DivSkillMeter").fadeOut(1000);
									$("#SpData").text("DON'T CHASE MONEY, IMPROVE YOUR SKILLS, MONEY WILL CHASE YOU..!");
									$("#SpData").animate({"top": $("#DivImage").height() * 40/100 ,"fontSize": 28 },300);
									$("#SpData").fadeIn(3000);
									$("#UlPictures").fadeIn(3000); 
									xCompleted=true;
									xReverse=true;
									$("#DivDollar").show();
									$("#DivDollar").stop().animate({"left": xMouseX,"top": xMouseY },{duration:700,easing:"easeInExpo"});
								}

							$("#DivSkillBar").stop().animate({"height": "+=15"},500); 
						} 
					else 
						{ 
							 
							$("#DivSkillBar").stop().animate({"height": "-=50"},300); 
						}
				},200);
		

	//-------Footer Div Animation

	$("#UlFooterMenu > li").click(function()
		{
			if(parseInt($("#DivFooter").css("bottom"))==-170)
				{
					
					$("#DivFooter").animate({"bottom":  0 },function(){ $("#SpDown").fadeIn(500); });
				}

			ToggleColor($(this));

		}
			      );

	$("#SpDown").click(function()
		{
			$("#DivFooter").animate({"bottom":  -170 },function(){ $("#SpDown").fadeOut(500); });
			ToggleColor(null);
		}
			);

	function ToggleColor(obj)
		{
			$("#UlFooterMenu > li").each(function() 
			{
				
				if(obj == null)
					{
						$(this).css({color: 'black'});
						$("#" + $(this).attr('class')).fadeOut(500);
					}
				else
					{
						if(! $(this).is($(obj)))
							{
								$(this).css({color: 'black'});
								$("#" + $(this).attr('class')).fadeOut(500);
							}
						else
							{
								$(this).css({color: 'white'});
								$("#" + $(this).attr('class')).fadeIn(500);
							}
					}
			 		
			
			});

		}

	//-------- GMAP Slider

	$("#UlAddressType > li").click(function()
				{
					var xText=$(this);
					$("#DivMapData > p").hide();

					$("#UlAddressType > li").each(function() 
									{
										if(xText.text()==$(this).text())
											{
												//$(this).css({"backgroundColor" : '#F7BB6D',"border-width":"2px"});
												$(this).addClass('LiBorder');
											}
										else
											{
												//$(this).css({"backgroundColor": 'transparent',"border-width":"0px"});
												$(this).removeClass('LiBorder');
											}
										
									});	

					$("#DivMapSlider").animate({'left': (xText.text()=="Current") ? 0 : -250},

					function(){
								
								if(xText.text()=="Current")
									{
										$("#DivMapData > p").html(" Gloier Technologies, Washermen Pet <br> Tirunelveli <br> Tamilnadu <br> India - 625321.");
									}
								else
									{
										$("#DivMapData > p").html(" 103 Aanimuthu pillayar kovil street <br> Virudhunagar <br> Tamilnadu <br> India - 626001."); 
									}

								$("#DivMapData > p").fadeIn(500);
					 
						  }
					);
					
				}
	);

	$("#DivBasement > div").hover(function()
		{
			$(this).stop().animate({"height":140,"width":130},
				     			function(){
 								$(this).find('> p').eq(0).css({"border-bottom" : "3px solid black"});
								$(this).css({"z-index":"999"});
								$(this).find('> p').eq(1).fadeIn(1000); 
				               }); 
		},
	 function()
		{ 
			$(this).css({"z-index":"0"});
			$(this).find('> p').eq(0).css({"border-bottom" : "none"});
			$(this).find('> p').eq(1).hide(); 
			$(this).stop().animate({"height":60,"width":60},
							function(){ 
								AnimateDiv($(this));
						}); 
	        });

	$("#DivOverView").hover(function()
		{
			$(this).stop().animate({"opacity":1});
		},
	function()
		{  
			$(this).stop().animate({"opacity":0.60});
		  });


 

	$("#DivCapabilities").bind("keydown keyup", function(e) 
							{

								e.preventDefault();

								if (e.type=="keyup")
									{
										
										$("#DivFrame").stop();
										xKeyDown=false;
										
									}
								else
									{

										if(xKeyDown==false)
											{
												xKeyDown=true;

												var xDistance=0;
												
												if(e.keyCode==39)
													{
													xDistance = -15000;
													xCarMoved = true;	
													}
                                                                                                else if(e.keyCode==37)
													{
													xDistance = 0;
													}
												
												if((xDistance == 0 && e.keyCode==37) || e.keyCode==39)
													{ 
												$("#DivFrame").stop().animate({
      												"left" : xDistance
												},{duration: (xDistance==0)? 10000 : 20000 , complete: function(){ xKeyDown=false; }});
													}

											}

										
									}
														
								  
							} 
			    );

	$("#DivMonitor,#DivFingers,#DivWorks").bind("mousemove mousedown mouseup",function(e)
			{
				if(e.type === "mousemove")
					{
						$("#DivFingers").addClass("DivFingerUnclicked");
						$("#DivFingers").css({"left" : e.pageX - 75,"top" : e.pageY - 10});
						

						if(xMonitorMouseDown === true)
							{ 
                                                        	if((e.pageX > $("#DivMonitorDisplay").offset().left) 
                                                        	&& 
                                                	(e.pageX < $("#DivMonitorDisplay").offset().left + $("#DivMonitorDisplay").width())
							&&
							(e.pageY > $("#DivMonitorDisplay").offset().top) 
                                                        && 
                                                	(e.pageY < $("#DivMonitorDisplay").offset().top + $("#DivMonitorDisplay").height()) )     
                                    				{
									$("#DivWorksWrapper").css({"left": (xNewLeft) + (e.pageX - xNewX)});
								}
							else
								{
									SwipeItNow(e);
									
																				
								}
							}
						
						
					}
				else if(e.type === "mousedown")
					{	
						if(HasSwiped === true)
							{
						$("#DivFingers").addClass("DivFingerClicked").removeClass("DivFingerUnclicked");
						xMonitorMouseDown = true;
						xNewLeft = $("#DivWorksWrapper").position().left;
						xNewX = e.pageX;
							}
					}
				else if(e.type === "mouseup")
					{
						$("#DivFingers").addClass("DivFingerUnclicked").removeClass("DivFingerClicked");
						if((e.pageX > $("#DivMonitorDisplay").offset().left) 
                                                        	&& 
                                                	(e.pageX < $("#DivMonitorDisplay").offset().left + $("#DivMonitorDisplay").width())
							&&
							(e.pageY > $("#DivMonitorDisplay").offset().top) 
                                                        && 
                                                	(e.pageY < $("#DivMonitorDisplay").offset().top + $("#DivMonitorDisplay").height()) ) 
							{
								SwipeItNow(e);
							}
						
					}
				
								
			}
  		);

	function SwipeItNow(e)
		{
			xMonitorMouseDown = false;
						
			if(HasSwiped === true)
				{
					HasSwiped=false;
								
					if(xNewX - e.pageX > 0)
						{
							if(xNewX - e.pageX > 100 && xNewLeft > (-4 * Math.floor($("#DivMonitorDisplay").width())))
								{
									$("#DivWorksWrapper").stop().animate({"left": Math.ceil(xNewLeft) - Math.ceil($("#DivMonitorDisplay").width())},function(){ HasSwiped = true; });	
												
								}
							else
								{
									$("#DivWorksWrapper").stop().animate({"left": Math.ceil(xNewLeft)},function(){ HasSwiped = true; });	
								}
						}
					else
						{
							if(xNewX - e.pageX < -100 && Math.ceil(xNewLeft) !== 0)
								{
												
									$("#DivWorksWrapper").stop().animate({"left": Math.ceil(xNewLeft) + Math.ceil($("#DivMonitorDisplay").width())},function(){ HasSwiped = true; });	
								}
							else
								{
									$("#DivWorksWrapper").stop().animate({"left": Math.ceil(xNewLeft)},function(){ HasSwiped = true; });	
								}
						}
					console.log(Math.floor(xNewLeft) + "," + xNewLeft);
				}
		}

				
	//--------Sliding Divs Top-Bottom and vice versa.

	$(".1,.2,.3,.4,.5").click(function()
		{
			var xTargetDiv = $(this).attr("class");
			var xCurrentTop = $("#DivMain").position().top;
			var xCurrentDiv = (xCurrentTop == 0) ? 1 : Math.round(Math.abs(xCurrentTop/$("#DivHome").height()))+1;
			var xNewTop= xCurrentTop + ((xCurrentDiv-xTargetDiv) * $("#DivHome").height());
			var xAnimating = false;

	//--------Here We have used the second syntax .animate(properties,options)

			if(xTargetDiv != xCurrentDiv)
				{

					if(parseInt($("#DivFooter").css("bottom"))==0)
						{
							$("#DivFooter").animate({"bottom": -170 });
							ToggleColor(null);
						}

                        		$("#DivMain").animate({ top : xNewTop },
								{ 
									duration: 1500,
									easing: "easeInOutExpo",
									step: function()
										{
											if(xAnimating==false)
												{
													$("#DivHeader").animate({ top : (xTargetDiv ==1) ? 0 : (-1 * $("#DivHeader").height()/1.5)},700);	
													xAnimating=true;
												}
										},
									complete: function() 
											{
												
												if(xTargetDiv==2) //To Basement
													{
														$("#DivBasement > div").each( 
															function()
																{ 
																	AnimateDiv($(this));
																}
														);
													}
												else if(xTargetDiv==3) //To Skills
													{

														$("#DivCapabilities").focus();

													}
												else if( xTargetDiv == 5 && $(".DivDroplet1").text().length == 0 ) //To Extras
													{														
														DoDropping();
													}

												if(xCurrentDiv == 2) //from Basement
													{       
														$("#DivBasement > div").each(function(){ $(this).stop(); });
													}
												
																							
											} 
								}
					     		);
				}
		}
	);

	//---------For Basement flying details

		function SetOffset()
			{

				var xTop,xLeft;
								
				//------ [-30-50-60=-140 footer's displaying ht + header's ht.+circle's ht.]
				//------ [rnd(max-min)+min for random no between both] 

				xTop=Math.floor(Math.random() * (parseInt($("#DivBasement").height() - 140))) + 50;
				xLeft=Math.floor(Math.random() * parseInt($("#DivBasement").width()-60));  //-60 for circles

				return {"left": xLeft,"top": xTop};
			}

		function AnimateDiv(xObj)
			{
			xObj.stop().animate(SetOffset(),3000,function(){ AnimateDiv(xObj); });
			}

	//----------For Faucet animation

		var PropD3 = {"left" : 160,"top" : 295,"width":30,"height":30};
		var PropD2 = {"left" : 175,"top" : 295,"width":30,"height":30};
		var PropD1 = {"left" : 167,"top" : 310,"width":30,"height":30};
		var PropDbck = {"left" : 160,"top" : 260,"width":30,"height":30};

		var xDetails=["<p style='margin:15px;'><u>About The Site</u></p><p style='margin:35px;'> My dad's always used to telling me that,'Every second in the life of a youngster is a gold coin'." +
					 "I took his word and i just built this site on spending some of my gold coins. Seriously i did not know anything about Css and jquery" +
					 ",before i getting started to build this site. But now i learnt many things including Jquery,css." +
					 "I took nearly four months to complete this project.</p>","<p style='margin:15px;'><u>About Me</u></p><p style='margin:35px;'> I am Rajaprabhu, A software engineer. Currently working in a small I.T company." +
					 "I love programming, The reason is, an hour of my work before a computer might save an hour work of multiple people. I like people who encourage others effort. similarly, I do encourage other people\'s effort" +
					 ".This panel will not require to tell up my whole story. You can read it up fully in my CV.</p>","<p style='margin:15px;'><u>My Application</u></p><p style='margin:35px;'> I am currently planned to recreate a product" +
					 " of ZOHO corp. I am sure that i'll recreate it with in short period of time. You may ask me that, why do you prefer to create an already created one.?" +
					 "Actually I believe that recreating a brilliant product will give me lot more experience on building my own product perfectly. The link for that recreated - app will get embedded here soon.</p>","<p style='margin:15px;'><u>My Videos</u></p>" +
					 "<p style='margin:35px;'> I have more interests in making short films and animated clips, Once, i was involved with that and created some clips" +
					 " like animating a stick figure, making slide shows with stories etc. I have been uploading those videos to youtube and i hope that i'll bring those" +
					 " to your display after uploading that stuffs. Links of those videos will get attached with this panel soon.</p>"];
		var xDetailsShown=0;
			
		function DoDropping()
			{
				$(".DivDroplet1").animate({"top": 610},"slow");

				$(".DivDroplet2").animate(PropD1);
				$(".DivDroplet3").animate(PropD2);
				$(".DivDropletBck").animate(PropD3);

				
				$(".DivDroplet1").animate({"backgroundColor": "gray","left": ($(window).width()/2) - (175),"top": ($(window).height()/2) - (187),"width":350,"height":375},{duration:"slow",complete: function(){ $(".DivDroplet1").empty().append(xDetails[Math.abs(xDetailsShown)]).css({"border":"3px solid black"}); }});
				
			}

		function ResetClass()
			{
				$(".DivDroplet2").removeClass("DivDroplet2").addClass("DivDroplet1");
				$(".DivDroplet3").removeClass("DivDroplet3").addClass("DivDroplet2");
				$(".DivDropletBck").removeClass("DivDropletBck").addClass("DivDroplet3");

				$('#DivExtras').append('<div class="DivDropletBck droplets"></div>');
				$(".DivDropletBck").css(PropDbck);
			}
	
		function InitialDropsSetup()
			{												
				$(".DivDropletBck").remove();
				$(".DivDroplet3").remove();
				$(".DivDroplet2").remove();
				$(".DivDroplet1").remove();

				$('#DivExtras').append('<div class="DivDroplet1 droplets"></div><div class="DivDroplet2 droplets"></div><div class="DivDroplet3 droplets"></div><div class="DivDropletBck droplets"></div>');
				
				$(".DivDropletBck").css(PropDbck);
				$(".DivDroplet3").css(PropD3);
				$(".DivDroplet2").css(PropD2);
				$(".DivDroplet1").css(PropD1);
			}

		$(".previous,.next").click(function(){ if($(this).attr("class")=="previous") { xDetailsShown = ((xDetailsShown - 1) % 4 < 0) ? 4 - Math.abs((xDetailsShown - 1) % 4): (xDetailsShown - 1) % 4; } else { xDetailsShown = (xDetailsShown + 1) % 4; } $(".DivDroplet1").animate({"opacity": 0},function(){ $(this).remove(); ResetClass(); DoDropping();}); });
		
					
	}

);