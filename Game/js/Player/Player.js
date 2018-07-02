//Player定義
var Player=function(core,vector2){
  this.sprite=new Sprite(32,32);
  this.sprite.image=core.assets['./img/chara1.png'];
  this.vector2=vector2;
  this.core=core;
}
Player.prototype={
  getSprite : function(){
    return this.sprite;
  },
  setPosition :function(vector2){
    this.vector2.sub(vector2);
  },
  setVelocity :function(vector2){
    this.vector2.plus(vector2);
  },
  upDate :function(){
    if(this.core.input.w){
      this.vector2.y-=2;
    }
    if(this.core.input.d){
      this.vector2.x+=2;
    }
    if(this.core.input.s){
      this.vector2.y+=2;
    }
    if(this.core.input.a){
      this.vector2.x-=2;
    }
    this.sprite.x=this.vector2.x;
    this.sprite.y=this.vector2.y;
  }
}
