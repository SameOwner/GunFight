var TimeUI=function(core){
  this.label=new Label("180");
  this.pos=new Vector2(140,32);
  this.time=180*60;
}

TimeUI.prototype={
  upDate : function(){
    this.time--;
    this.label.moveTo(this.pos.x,this.pos.y);
    this.label.text=String(parseInt(this.time/60));
  },
  getLabel :function(){
    return this.label;
  },
  getTime:function(){
    return parseInt(this.time/60);
  }
}
