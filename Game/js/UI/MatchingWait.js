
class MatchingWait{
  constructor(core,x,y){
    this._x=x;
    this._y=y;
    this._sprite=new Sprite(128,128);
    this._sprite.image=core.assets['./img/matching_wait.png'];
    this._sprite.x=this._x;
    this._sprite.y=this._y;
    this._sprite.scaleX=0.2;
    this._sprite.scaleY=0.2;

    this._count=0;
  }
  update(){
    this._count+=3;
    if(this._count>=360)this._count=0;

    this._sprite.rotation=this._count;
  }
  getSprite(){
    return this._sprite;
  }
}
