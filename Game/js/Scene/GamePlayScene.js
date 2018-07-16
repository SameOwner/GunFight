var gamePlayScene=function(core){
  var scene=new Scene();

  //時間UI追加
  var timeUi=new TimeUI(core);
  //弾マネージャー追加
  var bulletManager=new BulletManager(core);
  scene.addChild(timeUi.getLabel());

  var blockManager = new BlockManager(scene);
  blockManager.AddBlock(new Block(core, new Vector2(0, 0), 5, 320));
  blockManager.AddBlock(new Block(core, new Vector2(315, 0), 5, 320));
  blockManager.AddBlock(new Block(core, new Vector2(0, 0), 320, 5));
  blockManager.AddBlock(new Block(core, new Vector2(0, 315), 320, 5));
  blockManager.AddBlock(new Block(core, new Vector2(50, 50), 50, 50));

  //プレイヤー追加
  var player = new Player(core, new Vector2(128, 128));
  scene.addChild(player.getSprite()); // 現在のシーンに熊を追加

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

    let offset = new Vector2(player.getSprite().width / 2, player.getSprite().height / 2);
    player.setPosition(blockManager.Intersect(player.getPosition(), offset, offset.x * player.getSprite().scaleX));

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
  });

  return scene;
}
