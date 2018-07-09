		socket.on('setroom', (num)=>{
			room=num;
			console.log(`接続を開始します、ルーム番号は${room}です`);
		});