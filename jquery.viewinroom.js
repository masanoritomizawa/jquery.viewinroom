/**
 * jquery.viewinroom.js
 * 
 */
;(function($) {
  $.fn.viewinroom = function(options) {
    var defaults = {
      imgRoom : '/js/jquery.viewinroom-1.0/img/scale-image.jpg'
      ,eleImg : null
      ,duration1 : 1000
      ,duration2 : 2000
      ,scale : 0.5
      ,verticalPosition : 0.7 // 0.0(bottom) - 1.0(top)  (0.5=center)
      ,horizontalPosition : 0.5 // 0.0(left) - 1.0(right)  (0.5=center)
      ,imgRoomWidthCm :  257  // real width of background image [cm]
      ,imgWidthCm : 73 // real width of front image [cm]
      ,zIndex : 999999999
      ,backgroundColor : "#fff"
      ,positionTop : 50
    };
    var setting = $.extend(defaults,options);

    var elements = this;
    elements.click(function() {
    	if(flg1) return false;
    	animate1($(this),setting);
    	return false;
    });

    $(window).click(function() {
    	if(flg1) hideCanvas();
    });
    $(window).keydown(function(e){
    	if(e.keyCode==27) {
    		hideCanvas();
    	}
    });
    return this;
  };
  var flg1=false;
  var eleCanvas=null;
  var eleCanvasWidth=0;
  var eleCanvasHeight=0;
  var eleRoom=null;
  var eleRommWidth=0;
  var eleRoomHeight=0;
  var eleRoomX=0;
  var eleRommY=0;
  var eleTarget=null;
  var eleTargetWidth=0;
  var eleTargetHeight=0;
  var eleTargetX=0;
  var eleTargetY=0;
  var eleTargetWidthNew=0;
  var eleTargetHeightNew=0;
  var eleTargetXNew=0;
  var eleTargetYNew=0;
  function motion($obj,setting){
	  eleRoom.stop().animate({opacity:1},setting.duration1);
	  eleCanvas.stop().animate({opacity:1},setting.duration1,0,function(){animate2($obj,setting);});
  };
  function hideCanvas(){
    if(eleCanvas) {
    	eleCanvas.remove();
    	eleCanvas=null;
    }
    if(eleTarget) {
    	eleTarget.remove();
    }
    if(eleRoom) {
    	eleRoom.remove();
    }
    flg1=false;
  };
  function animate1($obj,setting) {
	  flg1=true;
	  if(!eleCanvas) {
		  eleCanvas=$("<div />")
		  eleCanvas.css(
				{width:$(document).width(),height:$(document).height()
				,position:'absolute',top:0,left:0,'z-index':setting.zIndex
				,opacity:0
				,'background-color':setting.backgroundColor
				}
		  );
		  $("body").append(eleCanvas);
	  } else {
		  eleCanvas.css({display:'block',opacity:0});
	  }
	  eleCanvasWidth=$(document).width();
	  eleCanvasHeight=$(document).height();  
	  eleRoom=$("<img />");
	  eleRoom.attr("src",setting.imgRoom);
	  eleRoom.css({
		  	position:'absolute',top:0,left:0
		  	,'z-index':setting.zIndex+2
		  	,display:'block'
		  	,opacity:0
	  });
	  eleRoom.load(function(){
		  eleRoomWidth=eleRoom.width();
		  eleRoomHeight=eleRoom.height();
		  eleRoomX=(eleCanvasWidth-eleRoomWidth)/2;
		  eleRoomY=$(window).scrollTop()+setting.positionTop;
		  eleRoom.css({top:eleRoomY,left:eleRoomX});
	 	  eleTarget=setting.eleImg.clone();
	      eleTarget.css({
				position:'absolute',top:setting.eleImg.offset().top,left:setting.eleImg.offset().left
				,'z-index':setting.zIndex+3
				,display:'block'
				,opacity:1
			});
	      $("body").append(eleTarget);
	      eleTargetWidth=eleTarget.width();
	      eleTargetHeight=eleTarget.height();
	      calculate(setting);
		  motion($obj,setting);		  
	  });
	  $("body").append(eleRoom);
  };
  function calculate(setting){
	  var px_per_cm = eleRoomWidth / setting.imgRoomWidthCm;
	  var w_per_h = eleTargetWidth / eleTargetHeight ;
	  eleTargetWidthNew = setting.imgWidthCm * px_per_cm;
	  eleTargetHeightNew = eleTargetWidthNew / w_per_h ;
	  eleTargetXNew = eleRoomX + eleRoomWidth*(setting.horizontalPosition) - eleTargetWidthNew/2 ;
	  eleTargetYNew = eleRoomY + eleRoomHeight*(1-setting.verticalPosition) - eleTargetHeightNew/2 ;
  };
  function animate2($obj,setting) {
	  eleTarget.stop()
	  .animate({top:eleTargetYNew
		        ,left:eleTargetXNew
		        ,width:eleTargetWidthNew
		        ,height:eleTargetHeightNew
		        }
	           ,setting.duration2,0,function(){}
	  );
  };
 
}) (jQuery);
