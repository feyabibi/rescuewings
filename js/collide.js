

// 碰撞检测区域----------------------------------------------------------------------------------------
function collides(a, b) {
    return !(a.x +a.width < b.x ||
        a.y + a.height < b.y ||
        a.x>b.x+b.width||
        a.y>b.y+b.height);
}
// 是否碰撞
function handleCollisions() {
    playerBullets.forEach(function(bullet) {
        enemies.forEach(function(enemy) {
            if (collides(bullet, enemy)) {              
                bullet.explode();
                if (enemy.showNum == 0) {
                	enemy.life-=30*rem;
                }
                if (enemy.showNum == 1) {
                	enemy.life-=10;
                }
                if (enemy.showNum == 2) {
                	enemy.life-=1*rem;
                  	if(enemy.life<0){
                		data.heart.heartshow=true;  
                		data.heart.x=enemy.x;
                		data.heart.y=enemy.y; 
                		setTimeout(function () {
                			data.heart.heartshow=false;  
                		},(8000));             		
                	}
                }
                if (enemy.showNum == 3) {
                	enemy.life-=100*rem;
                	if(enemy.life<0){
                		data.star.starshow=true;  
                		data.star.x=enemy.x;
                		data.star.y=enemy.y; 
                		setTimeout(function () {
                			data.star.starshow=false;  
                		},(8000));             		
                	}
                }
                if(enemy.life<0){
                	enemy.explode();
                }
            }            
        });
    });
    // 玩家碰到敌人
    enemies.forEach(function(enemy) {
        if (collides(enemy, player)) {
        	player.explode();
        	enemy.explode();
            player.age--;
        }
    });
    // 玩家碰到爱心
    if (collides(data.heart, player)) {        
        data.heart.heartshow=false;
        data.heart.x=0;
        data.heart.y=0;
        player.age++; 
        if(player.age>5){
        	player.age=5;
        }           
    }
    // 玩家碰到星星
    if (collides(data.star, player)) {        
        data.star.starshow=false;
        data.star.x=0;
        data.star.y=0;
        data.star.starNum++;       
    }
    //玩家是否碰到火力
    fires.forEach(function(item) {
    	if (collides(item, player,0)) {
    		data.fireShow=false;
    		getfire=true;
    		setTimeout(function() {
    			getfire=false;
    		}, 10000);
    		item.explode(); 
    	}
    });
    //玩家是否碰到字母
    letters.forEach(function(item) {
        if (collides(item, player,0)) {
        	data.letterShow=false;
        	data.boardshow=true;
        	// 判断碰撞到的字母,并改变对应字母(排列在前面)的是否点亮属性
        	data.letter.every(function (letter) {
        		if(!letter.islight){
        			if (item.src==letter.src) {
        				letter.islight=true;
        				islightNum++;
        			  	return false;
        			}
        		}
        	    return true;
        	 });
            item.explode();            
        }
    });

}