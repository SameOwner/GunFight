var gamePlayScene=function(core){
  var scene=new Scene();

  //時間UI追加
  var timeUi=new TimeUI(core);
  //弾マネージャー追加
  var bulletManager=new BulletManager(core);


var frame=0;

  scene.addChild(timeUi.getLabel());

  //プレイヤー追加
  var enemy=new Enemy(core,new Vector2(256,256));
  var player=new Player(core,new Vector2(128,128));
  scene.addChild(player.getSprite()); // 現在のシーンに熊を追加
  scene.addChild(enemy.getSprite());
  //プレイヤーが弾を撃つイベント
  scene.addEventListener('touchstart', function(e) {
    //死んでるときは打てない
    if(player.getHp()>0)
    bulletManager.addBullet(player.SpawnBullet(new Vector2(e.x,e.y)));
  });
  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e)
  {
    player.upDate();
    enemy.upDate();
    bulletManager.upDate();
    timeUi.upDate();
    //あたり判定テスト
    for(var i=0;i<bulletManager.getBullets().length;i++){
      //当たっているかどうか
      if(bulletManager.getBullets()[i].getSprite().within(player.getSprite(),16)){
          //消す
          scene.removeChild(bulletManager.getBullets()[i].getSprite());
          //配列からも
          bulletManager.getBullets().splice(i,1);
          //ダメージ
          player.Damage();
      }
    }
    frame++;
    //貰う
    socket.on('update',(data)=>{
      if(data.playerNum!=playerNum){
        var enemyPos=new Vector2(data.pos[0],data.pos[1]);
        console.log(data.pos[0]);
        enemy.vector2.x=enemyPos.x;
        enemy.vector2.y=enemyPos.y;  
      }
    });
    //送る
    var playerPos=player.getPosition();
    var arrayPos=[playerPos.x,playerPos.y];
    socket.emit('update',{room:room,pos:arrayPos,playerNum:playerNum});

  });

  return scene;
}
