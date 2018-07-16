var gamePlayScene=function(core){
  var scene=new Scene();

  //時間UI追加
  var timeUi=new TimeUI(core);
  //弾マネージャー追加
  var bulletManager=new BulletManager(core);
  var frame=0;


  scene.addChild(timeUi.getLabel());

  var blockManager = new BlockManager(scene);
  blockManager.AddBlock(new Block(core, new Vector2(0, 0), 5, 320));
  blockManager.AddBlock(new Block(core, new Vector2(315, 0), 5, 320));
  blockManager.AddBlock(new Block(core, new Vector2(0, 0), 320, 5));
  blockManager.AddBlock(new Block(core, new Vector2(0, 315), 320, 5));
  blockManager.AddBlock(new Block(core, new Vector2(50, 50), 50, 50));

  var enemy=new Enemy(core,new Vector2(256,256));
  var player=new Player(core,new Vector2(128,128));

  var rulue=new GameRule(timeUi,player,enemy);
  scene.addChild(player.getSprite()); //　プレイヤー追加
  scene.addChild(enemy.getSprite());  //エネミー追加
  //プレイヤーが弾を撃つイベント
  scene.addEventListener('touchstart', function(e) {
    //死んでるときは打てない
    if(player.getHp()>0){
      bulletManager.addBullet(player.SpawnBullet(bulletManager,new Vector2(e.x,e.y)));
    }
  });
    //ネット貰う
    socket.on('update',(data)=>{
      if(data.playerNum!=playerNum){
        var enemyPos=new Vector2(data.pos[0],data.pos[1]);
        enemy.vector2.x=enemyPos.x;
        enemy.vector2.y=enemyPos.y;
        bulletManager.addEnemyBullet(data.bullets);
        if(data.hp<=0){
          enemy.isDeadFunction();
        };
      }
    });

  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e)
  {
    player.upDate();

    let offset = new Vector2(player.getSprite().width / 2, player.getSprite().height / 2);
    player.setPosition(blockManager.Intersect(player.getPosition(), offset, offset.x * player.getSprite().scaleX));

    enemy.upDate();
    bulletManager.upDate();
    timeUi.upDate();


    rulue.upDate();


    if(rulue.getIsEnd()){
      var sceneResult=resultScene(core,rulue);
      core.replaceScene(sceneResult);
      return;
    }

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
      else if(bulletManager.getBullets()[i].getSprite().within(enemy.getSprite(),16)) {
          scene.removeChild(bulletManager.getBullets()[i].getSprite());
          //配列からも
          bulletManager.getBullets().splice(i,1);
      }
    }
    //ネット系
    frame++;
    if(frame%1==0){
      //送る
      var playerPos=player.getPosition();
      var arrayPos=[playerPos.x,playerPos.y];
      var bullets=[0,0,0,0];  //座標x,座標y,動きベクトルx,動きベクトルy  撃ってない場合は全部0
      bullets=bulletManager.getNetBullet().slice();
      bulletManager.resetNetBullet();
      socket.emit('update',{room:room,pos:arrayPos,playerNum:playerNum,bullets:bullets,hp:player.getHp()});
    }
  });

  return scene;
}
