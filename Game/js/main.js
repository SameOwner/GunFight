enchant();

window.onload = function() {


    var core = new Core(320, 320); //表示される領域を設定
    core.fps = 64; // フレーム数を設定
    core.preload('./img/chara1.png'); //リソース読み込み

    //キーバインド
    core.keybind(87, "w");
    core.keybind(65, "a");
    core.keybind(83, "s");
    core.keybind(68, "d");



    core.onload = function() { //メイン処理
        var player=new Player(core,new Vector2(0,0));
        core.rootScene.addChild(player.getSprite()); // 現在のシーンに熊を追加
        core.rootScene.backgroundColor  = '#7ecef4'; //背景色変更

        //Update
        core.rootScene.addEventListener(Event.ENTER_FRAME, function(e)
        {
          player.upDate();
        });
    }
    core.start();
};
