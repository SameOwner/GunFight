
class ButtonUI{
  constructor(core,filepath,spritex,spritey,x,y,scalex,scaley){
    this._sprite=new Sprite(spritex,spritey);
    this._sprite.image=core.assets[filepath];
    this._x=x;
    this._y=y;
    this._sprite.x=x;
    this._sprite.y=y;
    this._sprite.scaleX=scalex;
    this._sprite.scaleY=scaley;
  }
  setEvent(func){
    this._sprite.addEventListener('touchend', func);
  }
  getSprite(){
    return this._sprite;
  }
}
