enchant();

window.onload = function() {


    var core = new Core(320, 320); //表示される領域を設定

    core.fps = 64; // フレーム数を設定
    //リソース読み込み
    core.preload('./img/player2.png');
    core.preload('./img/bullet.png');
    core.preload('./img/enemyBullet.png');
    //キーバインド
    core.keybind(87, "w");
    core.keybind(65, "a");
    core.keybind(83, "s");
    core.keybind(68, "d");
    core.onload = function() { //メイン処理
      //シーン読み込み
      var sceneGamePlay=gamePlayScene(core);
      var i=new Vector2(0,0);
      //ゲームプレイシーンへ;
        core.replaceScene(sceneGamePlay);
        core.currentScene.backgroundColor  = '#7ecef4'; //背景色変更
    }
    core.start();
};
