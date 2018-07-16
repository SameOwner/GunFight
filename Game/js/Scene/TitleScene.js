var titleScene=function(core){
  var scene=new Scene();
  let _core=core;

  let title = new Sprite(348,84);
  title.image=core.assets['./img/gunfight.png'];
  title.x=0;
  title.y=0;

  scene.addChild(title);
  //Update
  scene.addEventListener(Event.ENTER_FRAME, function(e){

  });

  return scene;
}
