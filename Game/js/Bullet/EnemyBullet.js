//Player定義
var EnemyBullet=function(core,pos){
  this.sprite=new Sprite(33,24);
  this.sprite.image=core.assets['./img/enemyBullet.png'];
  this.sprite.scale(0.7,0.7);
  var attackMult=new Vector2(attackVec2.x,attackVec2.y);
  attackMult.multi(new Vector2(25,25));
  posVec2.plus(attackMult);
  this.vector2=pos;
  this.core=core;

  this.sprite.x=this.vector2.x;
  this.sprite.y=this.vector2.y;

  this.sevePos=new Vector2(this.vector2.x,this.vector2.y);
}
EnemyBullet.prototype={
  getPosition :function(){
    return new Vector2(this.vector2.x,this.vector2.y);
  },
  setPosition :function(pos){
    this.vector2.x=pos.x;
    this.vector2.y=pos.y;
    this.sprite.x=pos.x;
    this.sprite.y=pos.y;
  }
  getSprite : function(){
    return this.sprite;
  }
}
