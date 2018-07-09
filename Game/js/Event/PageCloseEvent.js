window.onbeforeunload = function(){
    socket.emit('page close', {name:name,room:room});
};

socket.on('close room',()=>{
    alert("接続が切断されました");
    socket.emit('join', {name:name});
    
});
