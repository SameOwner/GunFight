window.onbeforeunload = function(){
    socket.emit('page close', {name:name,room:room});
};
