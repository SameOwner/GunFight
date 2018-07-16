enchant();

window.onload = function() {


    var core = new Core(screen_width, screen_height); //表示される領域を設定

    core.fps = 64; // フレーム数を設定
    //リソース読み込み
    core.preload('./img/player2.png');
    core.preload('./img/bullet.png');
    core.preload('./img/enemyBullet.png');
    core.preload('./img/matching_wait.png');
    core.preload('./img/decide_button.png');
    core.preload('./img/gunfight.png');
    core.preload('./img/start_button.png');
    core.preload('./img/returntitle_button.png');


    core.preload('./sound/matching_finish.mp3');
    core.preload('./sound/title.mp3');
    core.preload('./sound/bgm_gameplay.mp3');
    core.preload('./sound/result.mp3');
    core.preload('./sound/game_start.mp3');
    core.preload('./sound/game_finish.mp3');

    //キーバインド
    core.keybind(87, "w");
    core.keybind(65, "a");
    core.keybind(83, "s");
    core.keybind(68, "d");
    core.onload = function() { //メイン処理

      let bgmManager=new BGMManager(core);
      bgmManager.play('./sound/title.mp3');

      //シーン読み込み
      var sceneMatching=matchingScene(core);
      var sceneNaming=namingScene(core,sceneMatching);
      var sceneTitle=titleScene(core,sceneNaming,bgmManager);
      var sceneGamePlay=gamePlayScene(core,sceneTitle,bgmManager);
      var i=new Vector2(0,0);
      //ゲームプレイシーンへ;

      core.replaceScene(sceneTitle);
      core.currentScene.backgroundColor  = '#7ecef4'; //背景色変更

        socket.on('gamestart',()=>{
            alert("ゲームを開始します");
            socket.emit('ready', {room:room});

        });
        socket.on('go',(num)=>{
          maptype=num;
          let sound = core.assets['./sound/matching_finish.mp3'].clone();
          sound.play();
          bgmManager.play('./sound/bgm_gameplay.mp3');
          core.replaceScene(sceneGamePlay);

        });
        socket.on('close room',()=>{
          alert("接続が切断されました");
          location.reload();

        });
    }
    core.start();




};
