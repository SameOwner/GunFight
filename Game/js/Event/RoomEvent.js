		socket.on('setroom', (data)=>{
			room=data.room;
			playerNum=data.playerNum;
			console.log(`接続を開始します、ルーム番号は${room}です`);
		});
