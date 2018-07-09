
class ButtonUI{
  constructor(core,filepath,spritex,spritey,x,y){
    this.sprite=new Sprite(spritex,spritey);
    this.sprite.image=core.assets[filepath];
    this._x=x;
    this._y=y;
    this.sprite.addEventListener('touchend', function() {
      alert("aaa");
    });
  }
  getSprite(){
    return this._sprite;
  }
}
