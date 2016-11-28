// canvas更新区域----------------------------------------------------------------------------------
function update() {
	// 键盘事件操控玩家
    if (key.left) {
        player.x += 10*rem;
    }
    if (key.right) {
        player.x -= 10*rem;
    }
    if (key.top) {
        player.y += 10*rem;
    }
    if (key.bottom) {
        player.y -= 10*rem;
    }
    // 如果吃到字母的话,ctx2d出现
    if (data.boardshow) {
    	data.boardshow=false;
    	$('#mycanvas2').animate({
    	   top: $('#mycanvas3').css('height')
    	 }, 500).delay(800).animate({
    	 	top: '0'
    	}, 500,function () {
    		$('#mycanvas2').stop(true);
    	}); 
    }
    // 如果字母全部收集完全就跳出胜利的画面  玩家胜利!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    data.letter.forEach(function (letter) {
        if(islightNum==data.letter.length){            
            $("#end").css({display:"block"});
            $("#starNum").html(data.star.starNum);
            $("#flyTime").html(gameTime);
            $('#mycanvas').css({display:'none'});
            $('#mycanvas2').css({display:'none'});
            $('#mycanvas3').css({display:'none'});
            $("#restart2").click(function () {
                window.location.reload(); 
            });
            clearInterval(timer);
        }
        
    });
    // 判断宇航员是否飞出
    player.inBounds();
    // 判断字母是否飞出
    letters.forEach(function(letter) {
        letter.inBounds();
    });
    // 更新子弹位置
    playerBullets.forEach(function(item) {
        item.update();
    });
    // 过滤飞出的子弹和击中的子弹
    playerBullets = playerBullets.filter(function(item) {
        return item.active;
    });
    // 更新敌人位置
    enemies.forEach(function(enemy) {
        enemy.update();
    });
    // 过滤飞出的敌人和击中的敌人
    enemies = enemies.filter(function(enemy) {
        return enemy.active;
    });
    // 更新字母位置
    letters.forEach(function(item) {
         item.update();
    });
    // 更新火力位置
    fires.forEach(function(item) {
         item.update();
    });
    // 概率生成敌人
    if (Math.random() < 0.02) {
        enemies.push(Enemy());
    }
    // 概率生成字母,一个字母被吃掉后生成下一个
    if (Math.random() < 0.02) {
	    	if(!data.letterShow){
	    		letters.push(new Letter(Math.floor(Math.random()*10)));
	    		data.letterShow=true;	    		
	    	}        
    }
    // 概率生成火力,一个被吃掉后生成下一个
    if (Math.random() < 0.001) {
	    	if(!data.fireShow){
	    		fires.push(new Fire());
	    		data.fireShow=true;	    		
	    	}        
    }
    // 概率生成子弹
    if (Math.random() < 0.3) {
        playerBullets.push(new Bullet(18, player.x + player.width, player.y + player.height / 2));
    }
    handleCollisions();
}