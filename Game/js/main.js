enchant();

window.onload = function() {


    var core = new Core(320, 320); //表示される領域を設定

    core.fps = 64; // フレーム数を設定
    //リソース読み込み
    core.preload('./img/player2.png');
    core.preload('./img/bullet.png');
    core.preload('./img/matching_wait.png');
    core.preload('./sound/matching_finish.mp3');
    core.preload('./img/decide_button.png');
    
    //キーバインド
    core.keybind(87, "w");
    core.keybind(65, "a");
    core.keybind(83, "s");
    core.keybind(68, "d");
    core.onload = function() { //メイン処理
      //シーン読み込み
      var sceneNaming=namingScene(core);
      var sceneMatching=matchingScene(core);
      var sceneGamePlay=gamePlayScene(core);

      //ゲームプレイシーンへ;
        core.replaceScene(sceneNaming);
        core.currentScene.backgroundColor  = '#7ecef4'; //背景色変更

        socket.emit('join', {name:name});

        socket.on('gamestart',()=>{
            alert("ゲームを開始します");
            let sound = core.assets['./sound/matching_finish.mp3'].clone();
            sound.play();
            core.replaceScene(sceneGamePlay);

        });
    }
    core.start();




};
