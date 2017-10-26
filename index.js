const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('user online', 'A new user has connected.');

  socket.on('disconnect', () => {
    socket.broadcast.emit('user offline', 'A user has disconnected.');
  });

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('typing', (msg) => {
    io.emit('typing', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
