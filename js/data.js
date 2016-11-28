var rem = Math.floor(window.innerWidth/1366);
var data = {
	bule: {
	    name: new Image(),
	    src: 'css/image/bule.png'
	},
	green: {
	    name: new Image(),
	    src: 'css/image/green.png'
	},
	red: {
	    name: new Image(),
	    src: 'css/image/red.png'
	},
	yellow: {
	    name: new Image(),
	    src: 'css/image/yellow.png'
	},

    player: {
        name: new Image(),
        src: 'css/image/xfj.png',
        speed: 10
    },
    gameover: {
        name: new Image(),
        src: 'css/image/over.png',
        x:1366/3,
        y:1366/6, 
        width: 412*rem,
        height: 78*rem,
        show:false
    },
    sky: {
        name: new Image(),
        src: 'css/image/ICEbg.png'
    },
    zd: {
        name: new Image(),
        src: 'css/img/zd.png'
    },
    cd:{
    	name: new Image(),
    	src: 'css/image/rock.png',
    	height: 100*rem,
    },
    cdRock:{
    	name: new Image(),
    	src: 'css/image/cdRock.png',
    },
    heart:{
    	name: new Image(),
    	src: 'css/img/heart.png',
    	x:0,
    	y:0, 
    	width: 45*rem,
    	height: 39*rem,
    	heartshow:false,
    	heartx:10*rem,
    	hearty:15*rem,
    },
    star:{
    	name: new Image(),
    	src: 'css/image/star.png',
    	starshow:false,
    	x:0,
    	y:200,
    	width:40,
    	height:40,
    	starNum:0
    },
    flytime:{
    	name: new Image(),
    	src: 'css/img/flytime.png',
    	x: 1366/1.3,
    	y: 10*rem,
    	width: 45*rem,
    	height: 45*rem,
    },
    boom:{
    	name: new Image(),
    	src: 'css/image/boom.png',
    },
    letter:[{src:"css/image/H.png",tex:"H",islight:false},{src:"css/image/E.png",tex:"E",islight:false},{src:"css/image/L.png",tex:"L",islight:false},{src:"css/image/L.png",tex:"L",islight:false},{src:"css/image/O.png",tex:"O",islight:false},{src:"css/image/W.png",tex:"W",islight:false},{src:"css/image/O.png",tex:"O",islight:false},{src:"css/image/R.png",tex:"R",islight:false},{src:"css/image/L.png",tex:"L",islight:false},{src:"css/image/D.png",tex:"D",islight:false}],
    letterShow:false,//漂浮字母是否出现 
    fireShow:false,//漂浮火力是否出现 
    boardshow:false //底部字母是否出现  
};

for (var i = 0; i < data.letter.length; i++) {
    var preLoadImg = new Image();
    preLoadImg.src = data.letter[i].src;
}