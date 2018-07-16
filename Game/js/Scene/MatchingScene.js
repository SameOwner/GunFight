var matchingScene=function(core){
  var scene=new Scene();
  let _core=core;
  let waitCircle=new MatchingWait(core,240,-48);
  scene.addChild(waitCircle.getSprite());
  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e){
    waitCircle.update();
  });

  return scene;
}
