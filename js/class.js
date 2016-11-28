
// 构造函数区----------------------------------------------------------------------------------------------
function DrawYs(ys, sL, sT, sW, sH, l, t, scaW, scaH, ctx) {
    this.type = ys;
    this.startW = sL;
    this.startH = sT;
    this.width = sW;
    this.height = sH;
    this.left = l;
    this.top = t;
    this.scareW = scaW;
    this.scareH = scaH;
    this.ctx = ctx;
}
DrawYs.prototype.drawYss = function() {
    this.ctx.drawImage(
        this.type,
        this.startW,
        this.startH,
        this.width,
        this.height,
        this.left,
        this.top,
        this.scareW,
        this.scareH
    );
};
// 创建玩家
var player = {
    color: '#00A',
    x: 100*rem,
    y: 250*rem,
    xV:10*rem,
    yV:10*rem,
    g:0.05*rem,
    width: 104*rem,
    height: 49*rem,
    active: true,
    age:5,
    explode: function() {
    	if(this.age<2){
    		this.age=0;
    		data.gameover.show=true;
    		    	setTimeout(function() {
    	    window.location.reload(); 
    	}, 1000);        		   		
    	}
    },
    draw: function() {
        ctx.drawImage(data.player.name, this.x, this.y, this.width, this.height);
    },
    inBounds:function(){
    	if (this.y < mycanvas3.height) {
    	    this.y = mycanvas3.height;
    	}
    	if (this.y > my.height - this.height) {
    	    this.y = my.height - this.height;
    	}
    	if (this.x < 0) {
    	    this.x = 0;
    	}
    	if (this.x > my.width - this.width) {
    	    this.x = my.width - this.width;
    	}
    },
    motion:function(){
    	if(motionx<-6){
    		this.y += this.yV;    		
    	}
    	if(motionx>-6){
    		this.y -= this.yV;
    	}
    	if(motiony<0){
    		this.x += this.xV;
    	}
    	if(motiony>0){
    		this.x -= this.xV;
    	}
    	this.yV+=this.g;
    	this.xV+=this.g;
    }
};


// 子弹
var playerBullets = [];
function Bullet(speed, x, y) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.active = true;
    this.xV = +this.speed;
    this.yV = 0*rem;
    this.width = 20*rem;
    this.height = 10*rem;
    this.color = '#fff';
    this.g = 0.05*rem;
    this.inBounds = function() {
        return this.x >= 0 && this.x <= my.width && this.y >= 0 && this.y <= my.height;
    };
    this.draw = function() {
        ctx.save();
        if(getfire){
        	ctx.drawImage(data.zd.name,this.x, this.y-30*rem, this.width, this.height);
        	ctx.drawImage(data.zd.name,this.x, this.y+30*rem, this.width, this.height);
        }
        ctx.drawImage(data.zd.name,this.x, this.y, this.width, this.height);
        ctx.restore();
    };
    this.update = function() {
        this.x += this.xV;
        this.y += this.yV;
        this.xV += this.g;
        this.active = this.active && this.inBounds();
    };
    this.explode = function() {
        this.active = false;
    };
}
// 字母
var letters= [];
function Letter(letNum) {
	// 飘浮字母位置
    this.x = my.width / 4 + Math.random() * my.width / 2;
    this.y = my.height / 4 + Math.random() * my.height / 2;
    this.isdraw=false;    
    this.width=40*rem;
    this.height=50*rem;
    this.src=data.letter[letNum].src;
    this.xV = Math.random()-0.5;
    this.yV = Math.random()-0.5;
    this.inBounds=function(){
    	if (this.y < mycanvas3.height) {
    	    this.y = mycanvas3.height;
    	}
    	if (this.y > my.height - this.height) {
    	    this.y = my.height - this.height;
    	}
    	if (this.x < 0) {
    	    this.x = 0;
    	}
    	if (this.x > my.width - this.width) {
    	    this.x = my.width - this.width;
    	}
    };
    this.draw = function() {
        ctx.save();
        letterImg.src=this.src;
        ctx.drawImage(letterImg,this.x,this.y,this.width,this.height);
        ctx.restore();
    };
    this.update = function() {
    	try {
    	    this.x -= this.xV;
    	    this.y += this.yV;
    	} catch (e) {
    	    console.log(1);
    	}
    };
    this.explode = function() {
    	letters.splice(0,1);
    };
}
// 火力
var fires= [];
function Fire() {
	// 飘浮火力位置
    this.x = my.width / 4 + Math.random() * my.width / 2;
    this.y = my.height / 4 + Math.random() * my.height / 2;    
    this.width=40*rem;
    this.height=50*rem;
    this.xV = Math.random()-0.5;
    this.yV = Math.random()-0.5;
    this.draw = function() {
        ctx.save();
        ctx.drawImage(data.zd.name,this.x,this.y,this.width,this.height);
        ctx.restore();
    };
    this.update = function() {
    	this.x -= this.xV;
    	this.y += this.yV;
    	if (this.y < mycanvas3.height) {
    	    this.y = mycanvas3.height;
    	}
    	if (this.y > my.height - this.height) {
    	    this.y = my.height - this.height;
    	}
    	if (this.x < 0) {
    	    this.x = 0;
    	}
    	if (this.x > my.width - this.width) {
    	    this.x = my.width - this.width;
    	}
    };
    this.explode = function() {
    	fires.splice(0,1);
    };
}
var enemies = [];
// 敌人
function Enemy(I) {
    I = I || {};
    I.active = true;
    I.age = Math.floor(Math.random() * 128*rem);
    I.color = "red";
    I.x = my.width;
    I.y = my.height / 4 + Math.random() * my.height / 2;
    I.xV = 2*rem;
    I.yV = 0*rem;
    I.width = 88*rem;
    I.height = 73*rem;
    I.isdraw = false;
    I.istouch = false;
    I.touchNum = 0;
    I.life = 88*rem;

    I.inBounds = function() {
        return I.x >= 0 && I.x <= my.width &&
            I.y >= 0 && I.y <= my.height;
    };
    I.draw = function(ysData,speed) {
        ctx.save();
        if(this.life<1){
        	ctx.drawImage(data.boom.name,this.x, this.y, this.width, this.height);
        }else{
        	roundedRect(ctx, this.x, this.y-30*rem, this.life, 20*rem, 5*rem,5*rem,"red");
        	ctx.drawImage(ysData.name,this.x, this.y, this.width, this.height);
        }
        ctx.restore();
        this.speed = speed;        
    };
    I.update = function() {
        I.x -= I.speed;
        I.y += I.yV;
        I.yV = 3 * Math.sin(I.age * Math.PI / 64);
        I.age++;
        I.active = I.active && I.inBounds();
    };
    I.explode = function() {
        this.active = false;
    };
    return I;
}