// socket io
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(5000, function() {
  console.log('Socket IO Server is listening on port 5000');
});

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if(err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
};

// socket.io: conexiones al navegador
io.sockets.on('connection', function(socket) {
    console.log('browser connected...');
    io.sockets.emit('to_browser', 'server connected...'); // socket.io

    socket.on('disconnect', function(socket) {
        console.log('¡browser disconnect!');
        io.sockets.emit('to_browser', '¡browser disconnect!'); // socket.io
    });
});

// TCP server
var net = require('net');

net.createServer(function (client) {
    console.log('socket connected...');
    client.on('data', function(data) {
        var line = data.toString();
        console.log('got "data"', line);
        io.sockets.emit('to_browser', line); // socket.io
    });
    client.on('end', function() {
        console.log('end');
    });
    client.on('close', function() {
        console.log('close');
    });
    client.on('error', function(e) {
        console.log('error ', e);
    });
}).listen(3000, function() {
  console.log('TCP Server is listening on port 3000');
});