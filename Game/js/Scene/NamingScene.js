var namingScene=function(core){
    var scene=new Scene();
    let _core=core;

    var input = new Entity();

	//DOM設定
	input._element = document.createElement('input');
	input._element.setAttribute('type','text');
	input._element.setAttribute('maxlength','10');
	input._element.setAttribute('id','test');
	input._element.setAttribute('value','test');
	input.width = 100;
	input.height = 20;
	input.x = 10;
	input.y = 50;

	//rootSceneに追加
    scene.addChild(input);
        
    let decisionButton=new ButtonUI(core,'./img/decide_button.png',64,32,0,0,1,1);
    decisionButton.setEvent(function(){
        name=input._element.value;

    });
    scene.addChild(decisionButton.getSprite());
    //Update
    scene.addEventListener(Event.ENTER_FRAME, function(e){
        console.log(name);
    });
  
    return scene;
  }
  