
const port = 3000;
const express  = require('express');
const app  = express();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
let room_num = 0;

app.use('/', express.static(__dirname));

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
		let num=room_num;//今回のルーム番号
		let isStart=false;//ゲーム開始チェック
		//現在の番号のルームが存在しているかを確認
        if(io.sockets.adapter.rooms[num.toString()]){
			//ルームに既に人がいたら、ゲーム開始フラグを立てて、次の部屋をセット
			if(io.sockets.adapter.rooms[num.toString()].length==1)room_num++;
			isStart=true;
		}
		//入室
		socket.join(num.toString());
		console.log(`[${name.name}]さんが[${num}]ルームに入室しました`)
		console.log(io.sockets.adapter.rooms);
		if(isStart){
			//ゲーム開始、ルーム番号を渡す
			io.to(num.toString()).emit('gamestart',num.toString());
		}
		
	});
	socket.on('update',(data)=>{
		//更新情報の受け渡し
		io.to(data.room).emit('update', data);
	});
	//チャットメッセージ
	socket.on('chat message', (msg)=>{
		io.to(msg.room).emit('chat message', msg);
		console.log('message: ' + JSON.stringify(msg));
	});

	socket.on('page close',(data)=>{
		io.to(data.room).emit('close room');

	});
	//切断
	socket.on('disconnect', ()=>{
		console.log("disconnected");
	});
});


