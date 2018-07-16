

class BGMManager{
  constructor(core){
    this._core=core;
  }
  load(filepath){
    this._core.preload(filepath);
  }
  play(filepath){
    if(filepath===this._currentbgm)return;
    if(this._currentbgm)this._core.assets[this._currentbgm].stop();
    this._core.assets[filepath].play();
    this._core.assets[filepath].src.loop = true;
    this._currentbgm=filepath;
  }
  update(){
    this._count+=3;
    if(this._count>=360)this._count=0;

    this._sprite.rotation=this._count;
  }
}
