//Player螳夂ｾｩ
var Heart=function(core,scene,player){
  this.player=player;

  this.enemyHp=[];
  this.playerHp=[];

  this.hpEnemy=3;

  for(var i=0;i<=2;i++){
    var sprite=new Sprite(163,149);
    sprite.image=core.assets['./img/Heart.png'];
    sprite.opacity=1.0;
    sprite.x=150+32*i;
    sprite.y=-50;
    sprite.scale(0.1,0.1);
    this.enemyHp.push(sprite);
    //core.currentScene.addChild(sprite);
  }

  for(var i=0;i<=2;i++){
    var sprite=new Sprite(163,149);
    sprite.image=core.assets['./img/Heart.png'];
    sprite.opacity=1.0;
    sprite.x=32*i-50;
    sprite.y=-50;
    sprite.scale(0.1,0.1);
    this.playerHp.push(sprite);
  }
  for(var i =0;i<=2;i++){
        scene.addChild(this.playerHp[i]);
        scene.addChild(this.enemyHp[i]);
  }
}
Heart.prototype={
  upDate:function(){
    for(var i=0;i<3;i++){
      this.playerHp[i].opacity=0.0;
    }

    for(var i=0;i<this.player.getHp();i++){
      this.playerHp[i].opacity=1.0;
    }

    for(var i=0;i<3;i++){
      this.enemyHp[i].opacity=0.0;
    }
    for(var i=0;i<this.hpEnemy;i++){
      this.enemyHp[i].opacity=1.0;
    }
  },
  setEnemyHp:function(hp){
    this.hpEnemy=hp;
  }
}
