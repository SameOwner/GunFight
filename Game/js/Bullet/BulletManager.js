//Player定義
var BulletManager=function(core){
  this.core=core;
  this.bullets=[];
  this.enemyBullets=[]; //ポジションが入る
  this.playerBullets=[0,0,0,0];
}
BulletManager.prototype={
  setNetBullet : function(pos,attackVec){
    this.playerBullets[0]=pos.x;
    this.playerBullets[1]=pos.y;
    this.playerBullets[2]=attackVec.x;
    this.playerBullets[3]=attackVec.y;
  },
  getNetBullet :function(){
    return this.playerBullets;
  },
  resetNetBullet:function(){
    this.playerBullets=[0,0,0,0];
  },
  addEnemyBullet :function(bullets){
    var pos=new Vector2(bullets[0],bullets[1]);
    var attackVec=new Vector2(bullets[2],bullets[3]);
    if(attackVec.x!=0&&attackVec.y!=0&&pos.x!=0&&pos.y!=0){
      var bullet=new Bullet(this.core,pos,attackVec);
      this.core.currentScene.addChild(bullet.getSprite());
      this.bullets.push(bullet);
    }
  },
  addBullet :function(bullet){
    this.bullets.push(bullet);
    this.core.currentScene.addChild(bullet.getSprite());
  },
  getBullets :function(){
    return this.bullets;
  },
  upDate :function(){
    //弾たちのアップデート
    for(var i=0;i<this.bullets.length;i++){
      this.bullets[i].upDate();
      //範囲外の場合消す
      var x=this.bullets[i].getPosition().x;
      var y=this.bullets[i].getPosition().y;
      if(x<=-64||x>=1280||y<=-64||y>=1280){
        //消す
        this.core.currentScene.removeChild(this.bullets[i].getSprite());
        //配列からも
        this.bullets.splice(i,1);
      }
    }

  }
}
