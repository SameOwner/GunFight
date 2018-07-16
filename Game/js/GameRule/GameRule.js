//Player定義
var GameRule=function(timer,player,enemy){
  this.timer=timer;
  this.player=player;
  this.enemy=enemy;

  this.isTimeUp=false;
  this.isEnemyWin=false;
  this.isPlayerWin=false;
  this.isEnd=false;
}
GameRule.prototype={
  upDate:function(){
    if(!this.isEnd){
      if(player.getHp()<=0){
        this.isEnemyWin=true;
        this.isEnd=true;
      }
      else if(enemy.getIsDead()){
        this.isPlayerWin=true;
        this.isEnd=true;
      }
      else if(this.timer<=0){
        this.isTimeUp=true;
        this.isEnd=true;
      }
    }
  }
}
