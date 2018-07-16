var titleScene=function(core,naming){
  var scene=new Scene();
  let _core=core;

  let title = new Sprite(348,84);
  title.image=core.assets['./img/gunfight.png'];
  title.x=-20;
  title.y=0;
  title.scaleX=0.7;
  title.scaleY=0.7;
  scene.addChild(title);

  let decisionButton=new ButtonUI(core,'./img/start_button.png',64,32,screen_width*0.5-32,200,1,1);
  decisionButton.setEvent(function(){
    core.replaceScene(naming);
  });
  scene.addChild(decisionButton.getSprite());

  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e){

  });

  return scene;
}
