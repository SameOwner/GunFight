var gamePlayScene=function(core){
  var scene=new Scene();

  //時間UI追加
  var timeUi=new TimeUI(core);
  //弾マネージャー追加
  var bulletManager=new BulletManager(core);
  scene.addChild(timeUi.getLabel());

  //プレイヤー追加
  var player=new Player(core,new Vector2(128,128));
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
