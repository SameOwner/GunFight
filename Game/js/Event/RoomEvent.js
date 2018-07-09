		socket.on('setroom', (data)=>{
			room=data.room;
			playerNum=data.playerNum;
			console.log(`接続を開始します、ルーム番号は${room}です`);
		});
		io.to(socket.id).emit('setroom',{room:num.toString(),playerNum:playerNum});
