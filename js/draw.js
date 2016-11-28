// canvas绘制区----------------------------------------------------------------------------------
// 画大背景
function drawBigBG() {
	ctx.clearRect(0, 0, my.width, my.height);
	ctx2.clearRect(0, 0, mycanvas2.width, mycanvas2.height);
	ctx3.clearRect(0, 0, mycanvas3.width, mycanvas3.height);
	// 生成背景
	ctx.save();
	ctx.drawImage(data.sky.name,0, 0, my.width,my.height);
	ctx.drawImage(data.cd.name,0, my.height-data.cd.height, my.width, data.cd.height);
	if(data.gameover.show){
		ctx.drawImage(data.gameover.name, data.gameover.x, data.gameover.y, data.gameover.width, data.gameover.height);  
	} 
	ctx.restore();
	   // 顶部信息框
	    ctx3.save();
	    ctx3.lineWidth=5*rem;
	    ctx3.strokeRect(5*rem,5*rem,mycanvas3.width-10*rem, mycanvas3.height-10*rem);
	    ctx3.restore();
	    // 玩家生命数量
	    for (var i = 0; i < player.age; i++) {
	    	ctx3.save();
	    	ctx3.drawImage(data.heart.name, i*data.heart.width+data.heart.heartx, data.heart.hearty, data.heart.width, data.heart.height);
	    	ctx3.restore();
	    }

	    // 玩家星星收集数量
		ctx3.save();
		ctx3.drawImage(data.star.name,  w/2.2, 15*rem, data.star.width, data.star.height);
		ctx3.textAlign='left';
		ctx3.textBaseline='top';
		drawText('*'+data.star.starNum, w/2.07, 10*rem);
		ctx3.restore();
	    // 飞行时间    
	    ctx3.save();
	    ctx3.drawImage(data.flytime.name, data.flytime.x*rem, data.flytime.y*rem, data.flytime.width, data.flytime.height);
	    if(data.gameover.show){
	    	clearInterval(timer);
	    }
	    drawText('飞行时间:'+gameTime+"s", w/1.25, 50*rem);
	    ctx3.restore();
	    
	    // 底部的字母
	    ctx2.save();
	    data.letter.forEach(function (item,index) {
	    	if(item.islight){
	    		letterImg.src=item.src;
	    		ctx2.drawImage(letterImg,my.width*0.25+my.width*0.05*index,0*rem,40*rem,50*rem);
	    	}else{
	    		ctx2.lineWidth=10*rem;
	    		ctx2.font = 50*rem+'px 微软雅黑';
	    		ctx2.strokeStyle="#8A8989";
	    		ctx2.textAlign = 'left';
	    		ctx2.textBaseline = 'top';
	    		ctx2.strokeText(item.tex,my.width*0.25+my.width*0.05*index,-10*rem);
	    	}
	    });
	    ctx2.restore();

	    // 漂浮星星
	    if(data.star.starshow){
	    	ctx.drawImage(data.star.name,data.star.x, data.star.y, data.star.width,data.star.height);
	    }
	    // 漂浮爱心
	    if(data.heart.heartshow){
	    	ctx.drawImage(data.heart.name,data.heart.x, data.heart.y, data.heart.width,data.heart.height);
	    }
}
// 画画
function draw() {
	drawBigBG();
    // 生成玩家
    player.draw();
    // 生成子弹
    playerBullets.forEach(function(item) {
        item.draw();
    });
    // 生成字母
    letters.forEach(function(item) {
        item.draw();
    });
    // 生成火力
    fires.forEach(function(item) {
        item.draw();
    });
    // 按照概率随机生成敌人
    enemies.forEach(function(enemy) {
        if (enemy.isdraw) {
            enemy.draw(data[startype[enemy.showNum]], enemy.speed);
        } else {
            var rand = Math.random();
            enemy.isdraw = true;
            if (rand < 1 && rand > 0.4) {
                enemy.showNum = 0;
                enemy.speed = 3*rem;
                enemy.draw(data[startype[enemy.showNum]], enemy.speed);
            } else if (rand < 0.4 && rand > 0.15) {
                enemy.showNum = 1;
                enemy.speed = 2*rem;
                enemy.draw(data[startype[enemy.showNum]], enemy.speed);
            } else if (rand < 0.15 && rand > 0.05) {
                enemy.showNum = 2;
                enemy.speed = 1*rem;
                enemy.draw(data[startype[enemy.showNum]], enemy.speed);
            } else if (rand < 0.05 && rand > 0) {
                enemy.showNum = 3;
                enemy.speed = 10*rem;
                enemy.draw(data[startype[enemy.showNum]], enemy.speed);
            } else {
                enemy.isdraw = false;
            }

        }
    });
}
draw();

