//Player定義
var Bullet=function(core,posVec2,attackVec2){
  this.sprite=new Sprite(33,24);
  this.sprite.image=core.assets['./img/bullet.png'];
  this.sprite.scale(0.7,0.7);
  var attackMult=new Vector2(attackVec2.x,attackVec2.y);
  attackMult.multi(new Vector2(25,25));
  posVec2.plus(attackMult);
  this.vector2=posVec2;
  this.core=core;
  this.attackVec2=attackVec2;

  this.sprite.x=this.vector2.x;
  this.sprite.y=this.vector2.y;


}
Bullet.prototype={
  getPosition :function(){
    return new Vector2(this.vector2.x,this.vector2.y);
  },

  getSprite : function(){
    return this.sprite;
  },
  upDate :function(){
    this.vector2.x+=this.attackVec2.x*2;
    this.vector2.y+=this.attackVec2.y*2;
    var angle=this.attackVec2.Angle();
    this.sprite.rotation=angle;

    this.sprite.x=this.vector2.x;
    this.sprite.y=this.vector2.y;
  }
}
