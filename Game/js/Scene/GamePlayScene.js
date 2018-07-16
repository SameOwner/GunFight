var gamePlayScene=function(core,title,bgmManager){
  var scene=new Scene();
  //時間UI追加
  var timeUi=new TimeUI(core);
  //弾マネージャー追加
  var bulletManager=new BulletManager(core);
  var frame=0;

  var backGraund=new Sprite(320,320);
  backGraund.image=core.assets['./img/background.png'];
  backGraund.x=0;
  backGraund.y=0;

  scene.addChild(backGraund);



  var blockManager = new BlockManager(scene);
  blockManager.AddBlock(new Block(core, new Vector2(0, 0), 5, 320));
  blockManager.AddBlock(new Block(core, new Vector2(315, 0), 5, 320));
  blockManager.AddBlock(new Block(core, new Vector2(0, 0), 320, 50));
  blockManager.AddBlock(new Block(core, new Vector2(0, 315), 320, 5));

  socket.on('go',(num)=>{
    let playerPos;
    if(playerNum===1)playerPos=new Vector2(140,0);
    else playerPos=new Vector2(140,270);
    player.setPosition(playerPos);
    maptype=num;
    let text='';
    var req = new XMLHttpRequest();
    req.open("get", `../data/map${maptype}.csv`, true);
    req.send(null);
    req.onload = function(){
      text=req.responseText;
      text=text.split("\n");
      for(var i=0;i<text.length;++i){
        let result=[];
        result = text[i].split(",");
        blockManager.AddBlock(new Block(core, new Vector2(parseInt(result[0],10), parseInt(result[1],10)), parseInt(result[2],10),parseInt(result[3],10)));
      }
    }
  });



  scene.addChild(timeUi.getLabel());

  var enemy=new Enemy(core,scene,new Vector2(256,256));
  var player=new Player(core,scene,new Vector2(128,128));
  var rulue=new GameRule(timeUi,player,enemy);

  scene.addChild(player.getSprite()); //　プレイヤー追加
  scene.addChild(enemy.getSprite());  //エネミー追加
  var heart=new Heart(core,scene,player);

  var countDown=new Label("3");
  countDown.textAlign="center";
  countDown.x=10;
  countDown.y=150;
  countDown.scale(3,3);
  var countDownNum=3;
  var countDownFrame=0;

  scene.addChild(countDown);



  //プレイヤーが弾を撃つイベント
  scene.addEventListener('touchstart', function(e) {
    //死んでるときは打てない
    if(player.getHp()>0&&countDownNum<0){
      let sound = core.assets['./sound/shot.mp3'].clone();
      sound.play();
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
        heart.setEnemyHp(data.hp);
        enemy.setName(data.pName);
        if(data.hp<=0){
          enemy.isDeadFunction();
        };
      }


    });

  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e)
  {
    //ネット系
    frame++;
    if(frame%1==0){
      //送る
      var playerPos=player.getPosition();
      var arrayPos=[playerPos.x,playerPos.y];
      var bullets=[0,0,0,0];  //座標x,座標y,動きベクトルx,動きベクトルy  撃ってない場合は全部0
      bullets=bulletManager.getNetBullet().slice();
      bulletManager.resetNetBullet();
      socket.emit('update',{room:room,pos:arrayPos,playerNum:playerNum,bullets:bullets,hp:player.getHp(),pName:name});
    }



    countDownFrame++;
    if(countDownFrame>=60){
        countDownNum--;
        countDownFrame=0;
    }

    if(countDownNum>0){
      countDown.text=String(countDownNum);
      return;
    }
    else if(countDownNum==0){
      countDown.text="スタート";
      if(countDownFrame==0){
        let sound = core.assets['./sound/game_start.mp3'].clone();
        sound.play();
      }
      return;
    }
    else {
      countDown.opacity=0.0;
    }


    player.upDate();
    enemy.upDate();
    bulletManager.upDate();
    timeUi.upDate();
    rulue.upDate();
    heart.upDate();


    let offset = new Vector2(player.getSprite().width / 2, player.getSprite().height / 2);
    player.setPosition(blockManager.Intersect(player.getPosition(), offset, offset.x * player.getSprite().scaleX));

    if(rulue.getIsEnd()){
      socket.emit('game end', {room:room});
      bgmManager.play('./sound/result.mp3');

      var sceneResult=resultScene(core,rulue,title);
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

          let sound = core.assets['./sound/hit.mp3'].clone();
          sound.play();
      }
      else if(bulletManager.getBullets()[i].getSprite().within(enemy.getSprite(),16)) {
          scene.removeChild(bulletManager.getBullets()[i].getSprite());
          //配列からも
          bulletManager.getBullets().splice(i,1);
          let sound = core.assets['./sound/hit.mp3'].clone();
          sound.play();
      } else {
          var bullet = bulletManager.getBullets()[i];
          let offset = new Vector2(bullet.getSprite().width / 2, bullet.getSprite().height / 2);
          if (blockManager.IsCollision(bullet.getPosition(), offset, offset.x * bullet.getSprite().scaleX)) {
              scene.removeChild(bullet.getSprite());
              bulletManager.getBullets().splice(i, 1);
          }
      }
    }
  });

  return scene;
}
