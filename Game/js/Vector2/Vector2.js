var Vector2=function(x,y){
  this.x=x;
  this.y=y;
}
//演算子オーバーロードは許してないらしいから許して
Vector2.prototype={
  sub :function(vector2){
    this.x=vector2.x;
    this.y=vector2.y;
  },

  //Vector2同士の足し算
  plus :function(vector2){
    this.x+=vector2.x;
    this.y+=vector2.y;
  },
  minus :function(vector2){
    this.x-=vector2.x;
    this.y-=vector2.y;
  },
  multi:function(vector2){
    this.x*=vector2.x;
    this.y*=vector2.y;
  },
  divVec:function(vector2){
    this.x/=vector2.x;
    this.y/=vector2.y;
  },
  distance:function(vector2){
    var vecX=vector2.x-this.x;
    var vecY=vector2.y-this.y;
    vecX=Math.pow(vecX,2);
    vecY=Math.pow(vecY,2);
    return Math.sqrt(vecX+vecY);
  },
  normalize:function(){
    var sq=Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    return new Vector2(this.x/sq,this.y/sq);
  },
  length:function(){
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
  },
  dot:function(vector2){
    return this.x*vector2.x+this.y*vector2.y;
  },
  //なす角
  Angle:function(){

  var angle=Math.atan2(this.y,this.x);
    return angle*180.0/Math.PI+180;
  }
}
