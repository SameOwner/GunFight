//Player定義
var Heart=function(core,player){
  this.player=player;

  this.enemyHp=[];
  this.playerHp=[];

  this.hpEnemy=3;

  for(var i=0;i<=2;i++){
    this.enemyHp.push(new Sprite(163,149));
    this.enemyHp[i].image=core.assets['./img/Heart.jpg'];
    core.currentScene.addChild(this.enemyHp[i]);
  }
  for(var i=0;i<=2;i++){
    this.playerHp.push(new Sprite(163,149));
    this.playerHp[i].image=core.assets['./img/Heart.jpg'];
    core.currentScene.addChild(this.playerHp[i]);
  }
}
GameRule.prototype={
  upDate:function(){
    for(var i=0;i<3;i++)
      this.playerHp[i].opacity=0.0;
    for(var i=0;i<this.player.getHp();i++){
      this.playerHp[i].opacity=1.0;
      this.playerHp[i].x=0+32*i;
      this.playerHp[i].scale(0.5,0.5);
    }

    for(var i=0;i<3;i++)
      this.enemyHp[i].opacity=0.0;
    for(var i=0;i<this.hpEnem;i++){
      this.enemyHp[i].opacity=1.0;
      this.enemyHp[i].x=200+32*i;
      this.enemyHp[i].scale(0.5,0.5);
    }
  },
  setEnemyHp:function(hp){
    this.hpEnemy=hp;
  }
}
