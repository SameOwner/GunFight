
const port = 3000;
const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
let room_num = 0;

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/index.html');
});

http.listen(port, ()=>{
	console.log(`${port}ポートで接続待機します`);
});


//--------------------------------------
// Socket.io
//--------------------------------------
io.on('connection', (socket)=>{
	//接続時のメッセージ
	console.log('接続を確認しました');

	//部屋に入る
	socket.on('join', function(name) {
		let num=room_num;
        if(io.sockets.adapter.rooms[num.toString()]){
			if(io.sockets.adapter.rooms[num.toString()].length==1)room_num++;
		}
		socket.join(num.toString());
		console.log(`[${name}]さんが[${num}]ルームに入室しました`)
		console.log(io.sockets.adapter.rooms);
	});

	//チャットメッセージ
	socket.on('chat message', (msg)=>{
		io.to(msg.room).emit('chat message', msg);
		console.log('message: ' + JSON.stringify(msg));
	});

	//切断
	socket.on('disconnect', (msg)=>{
		console.log('user disconnected');
	});
});


