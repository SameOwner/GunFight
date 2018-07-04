//Player定義
var BulletManager=function(core){
  this.core=core;
  this.bullets=[];
}
BulletManager.prototype={
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
