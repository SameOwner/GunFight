//Player定義
var Enemy=function(core,scene,vector2){
  this.sprite=new Sprite(40,56);
  this.sprite.image=core.assets['./img/player2.png'];
  this.frame=0;
  this.vector2=vector2;
  this.core=core;
  this.time=0;
  this.direNum=0;
  this.sevePos=new Vector2(vector2.x,vector2.y);

  this.isDead=false;

  this.nameLabel=new Label("敵");
  this.nameLabel.x=this.vector2.x-130;
  this.nameLabel.y=this.vector2.y;
  this.nameLabel.textAlign ="center";
  this.sprite.scale(0.7,0.7);
  scene.addChild(this.nameLabel);


}
Enemy.prototype={
  getSprite : function(){
    return this.sprite;
  },
  setPosition :function(vector2){
    this.vector2.sub(vector2);
  },
  setVelocity :function(vector2){
    this.vector2.plus(vector2);
  },
  getPosition :function(){
    return new Vector2(this.vector2.x,this.vector2.y);
  },
  //座標をセットする
  setPosition:function(pos){
    this.vector2=pos;
  },
  isDeadFunction:function(){
    this.isDead=true;
    this.sprite.opacity=0.0;
  },
  getIsDead:function(){
    return this.isDead;
  },
  upDate :function(){
    //移動してるか？
    var isMove=false;

    var velo=new Vector2(this.vector2.x,this.vector2.y);
    velo.minus(this.sevePos);
    this.sevePos=new Vector2(this.vector2.x,this.vector2.y);
    //向きナンバー
    if(velo.x>0&&velo.y<0)this.direNum=3*7;
    else if(velo.x>0&&velo.y>0)this.direNum=3*3;
    else if(velo.x<0&&velo.y<0)this.direNum=3*5;
    else if(velo.x<0&&velo.y>0)this.direNum=3*1;
    else if(velo.x<0&&velo.y==0)this.direNum=3*2;
    else if(velo.x>0&&velo.y==0)this.direNum=3*4;
    else if(velo.x==0&&velo.y<0)this.direNum=3*6;
    else if(velo.x==0&&velo.y>0)this.direNum=3*0;


    //アニメーション処理
    this.time++;
    if(this.time%10==0){
        this.frame+=2;
        //一個とばし
        if(this.frame>=3)this.frame=0;
      }



    //動いてなかったら止まってる
    if(velo.x==0&&velo.y==0)
    this.frame=1;
    //フレーム設定
    this.sprite.frame=this.frame+this.direNum;

    this.sprite.x=this.vector2.x;
    this.sprite.y=this.vector2.y;


    this.nameLabel.x=this.vector2.x-130;
    this.nameLabel.y=this.vector2.y;
  },
  setName:function(enemyName){
    this.nameLabel.text=enemyName;
  }
}
