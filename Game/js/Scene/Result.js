var resultScene=function(core,gameRulue){
  var scene=new Scene();


  var label=new Label("");
  label.moveTo(100,100);
  if(gameRulue.getIsWinPlayer())
  label.text=String("あなたの勝ち");
  else if(gameRulue.getIsWinEnemy())
  label.text=String("あなたの負け");
  else if(gameRulue.getIsTimeUp())
  label.text=String("時間切れ");

  scene.addChild(label);

  //タッチイベント
  scene.addEventListener('touchstart', function(e) {

  });
    //ネット貰う
    socket.on('update',(data)=>{

    });

  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e)
  {

  });

  return scene;
}
