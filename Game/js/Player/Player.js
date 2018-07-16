//Player定義
var Player=function(core,vector2){
  this.sprite=new Sprite(40,56);
  this.sprite.image=core.assets['./img/player2.png'];
  this.sprite.scale(0.5,0.5);
  this.frame=0;
  this.vector2=vector2;
  this.core=core;
  this.bullets=[];
  this.time=0;
  this.direNum=0;
  this.Hp=5;
}
Player.prototype={
  getSprite : function(){
    return this.sprite;
  },
  Damage:function(){
    this.Hp--;
  },
  getHp :function(){
    return this.Hp;
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
  upDate :function(){
    //移動してるか？
    var isMove=false;
    //速度
    var velo=new Vector2(0,0);
    //移動速度
    var speed=2;
    //移動処理
    if(this.core.input.w){
      velo.y-=speed;
      isMove=true;
    }
    if(this.core.input.d){
      velo.x+=speed;
      isMove=true;
    }
    if(this.core.input.s){
      velo.y+=speed;
      isMove=true;
    }
    if(this.core.input.a){
      velo.x-=speed;
      isMove=true;
    }
    this.vector2.plus(velo);

    //クランプ
    if(this.vector2.x<=-15)this.vector2.x=-15;
    if(this.vector2.x>=this.core.width-30)this.vector2.x=this.core.width-30;
    if(this.vector2.y>=this.core.height-40)this.vector2.y=this.core.height-40;
    if(this.vector2.y<=-25)this.vector2.y=-25;

    //向きを代入
    this.sprite.x=this.vector2.x;
    this.sprite.y=this.vector2.y;
    //向き野よってスプライトのフレーム位置を変える
    if(velo.x>0&&velo.y<0)this.direNum=3*7
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
    if(!isMove)
    this.frame=1;
    this.sprite.frame=this.frame+this.direNum;

    //HPがゼロになったら完全に透明にする
    if(this.Hp<=0)
    this.sprite.opacity=0.0;


  },
  //攻撃する時に呼ぶ
  SpawnBullet :function(bulletManager,attackVec2){
    var playerPos=new Vector2(this.vector2.x,this.vector2.y);
    playerPos.plus(new Vector2(40/2/2,56/2/2));
    attackVec2.minus(playerPos);
    var normalizeVec=new Vector2(attackVec2.x,attackVec2.y).normalize();
    var bulletSpawnPos=new Vector2(this.vector2.x+(40*0.2/2),this.vector2.y+(56*0.7/2));
    bulletManager.setNetBullet(bulletSpawnPos,normalizeVec);
    return new Bullet(this.core,bulletSpawnPos,normalizeVec);
  }
}
