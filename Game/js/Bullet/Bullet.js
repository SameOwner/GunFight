//Player定義
var Bullet=function(core,posVec2,attackVec2){
  this.sprite=new Sprite(32,64);
  this.sprite.image=core.assets['./img/chara1.png'];
  this.vector2=posVec2;
  this.core=core;
  this.attackVec2=attackVec2;
}
Bullet.prototype={
  getSprite : function(){
    return this.sprite;
  },
  upDate :function(){
    this.vector2.x+=this.attackVec2.x*0.1;
    this.vector2.y+=this.attackVec2.y*0.1;
    this.sprite.x=this.vector2.x;
    this.sprite.y=this.vector2.y;
  }
}
