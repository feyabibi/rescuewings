var gamestar=false;
var timer=null;
$('#wrap').mousemove(function(event) {
	$('.finger').css({left:event.pageX,top:event.pageY});
});
$('#play').click(function(event) {
	$('#start').animate({top:- window.innerHeight, opacity: 0}, 1000,function () {
		$('#start').css({display:'none'});
		$('#getready').css({display:'block'});
		$('#setout').animate({opacity: 0}, 1000,function () {
			$('#setout').animate({opacity: 1}, 500).removeClass('ready').addClass('go').animate({opacity: 0}, 1000,function(){
					$('#getready').css({display:'none'});
					$('#mycanvas').css({display:'block'});
					$('#mycanvas2').css({display:'block'});
					$('#mycanvas3').css({display:'block'});
					setTimeout(function() {
						gamestar=true;
						timer=setInterval(function() {
						    gameTime++;
						}, 1000);
					}, 500);
					
				});
			});
		});
	});
$('#setting').click(function(event) {
	$('#start').animate({top:window.innerHeight, opacity: 0}, 1000,function () {
		$('#help').css({display:'block'});
		$('#start').css({display:'none'});
	});
});

$('.back').click(function(event) {
	$('#help').animate({left:-window.innerWidth, opacity: 0}, 1000,function () {
		$('#start').css({display:'block',opacity:1,top:0});
		$('#help').css({display:'none',opacity:1,left:0});
	});
});

function resizeCanvas(){  
      var width = document.getElementById('wrap').offsetWidth;  
      $('#mycanvas').attr('width', width);  
      $('#mycanvas2').attr('width', width);  
      $('#mycanvas3').attr('width', width);  
}
// window.addEventListener("resize", function() {
//     w = window.innerWidth;
//     h = window.innerHeight;
//     my.width = w;
//     my.height = h;
//     draw();
// });
resizeCanvas();
var rem = Math.floor(window.innerWidth/1366);
var my = document.getElementById('mycanvas');
var mycanvas2 = document.getElementById('mycanvas2');
var mycanvas3 = document.getElementById('mycanvas3');
var ctx = my.getContext('2d');
var ctx2 = mycanvas2.getContext('2d');
var ctx3 = mycanvas3.getContext('2d');
var w = window.innerWidth;
var h = window.innerHeight;
my.width = w;
mycanvas2.width = w;
mycanvas3.width = w;
mycanvas2. height=w*0.05;
mycanvas3. height=w*0.05;
my.height = h;
var key = {
    left: false,
    right: false,
    top: false,
    bottom: false,
    space: false
};
var useMotionPlay=true;
var gameTime = 0;
// 绘制图片
var letterImg=new Image();
data.sky.name.src = data.sky.src;
data.star.name.src = data.star.src;
data.boom.name.src = data.boom.src;
data.gameover.name.src = data.gameover.src;
data.red.name.src = data.red.src;
data.bule.name.src = data.bule.src;
data.green.name.src = data.green.src;
data.yellow.name.src = data.yellow.src;
data.player.name.src = data.player.src;
data.cd.name.src = data.cd.src;
data.cdRock.name.src = data.cdRock.src;
data.heart.name.src = data.heart.src;
data.flytime.name.src = data.flytime.src;
data.zd.name.src = data.zd.src;
var getfire=false;
var Snum = 0;
var MNumlow = 0;
var MNummid = 0;
var MNumsup = 0;
var MNumfast = 0;
var islightNum=0;//被点亮的字母个数
var startype = Object.keys(data);
var motionx = 0;
var motiony = 0;
var motionz = 0;



// 判断按键
document.onkeydown = function(event) {
    if (event.which == 68) {
        key.left = true;
    }
    if (event.which == 65) {
        key.right = true;
    }
    if (event.which == 83) {
        key.top = true;
    }
    if (event.which == 87) {
        key.bottom = true;
    }
    if (event.which == 32) {
        key.space = true;
    }

};
document.onkeyup = function(event) {
    if (event.which == 68) {
        key.left = false;
    }
    if (event.which == 65) {
        key.right = false;
    }
    if (event.which == 83) {
        key.top = false;
    }
    if (event.which == 87) {
        key.bottom = false;
    }
    if (event.which == 32) {
        key.space = false;
    }
};



// 重力感应按键---------------------------------------------------
window.addEventListener('devicemotion', function(e) {
    var motion = e.accelerationIncludingGravity;
    //重力加速，IOS下所有的数值 和 安卓都是相反的
    motionx = Math.round(motion.x);
    motiony = Math.round(motion.y);
    motionz = Math.round(motion.z);
});





// 绘画函数区---------------------------------------------------------------------------------------
// 画椭圆
function EllipseOne(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y);
    for (var i = 0; i < 2 * Math.PI; i += step) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    ctx.stroke();
}
// 陨石在椭圆上运动
function ysEllipseMove(x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    var arr = [];
    for (var i = 0; i < 2 * Math.PI; i += step) {
        var x1 = parseInt(x + a * Math.cos(i));
        var y1 = parseInt(y + b * Math.sin(i));
        arr.push([x1, y1]);
    }
    return arr;
}
// 画文字
function drawText(date, l, t) {
    ctx3.save();
    ctx3.fillStyle = '#000';
    ctx3.font = 40*rem+'px 微软雅黑';
    ctx3.textAlign = 'left';
    ctx3.fillText(date, l, t);
    ctx3.restore();
}
// 封装的一个用于绘制圆角矩形的函数.
function roundedRect(ctx, x, y, width, height, radius,liW,color) {
	ctx.save();
	ctx.lineWidth=liW;
	ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.fill();
    ctx.restore();
}

// 渲染区------------------------------------------------------------------
window.onload = function() {
    draw();
};
function render() {
    if (Snum > 33) {
        Snum = 0;
    }
    Snum++; //雪碧图位置下标
    if(data.gameover.show){
    	drawBigBG();	
    }
    if(gamestar){
    	update();
    	draw();
    }
    requestAnimationFrame(render);
}
requestAnimationFrame(render);