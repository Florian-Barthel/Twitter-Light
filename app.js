const net = require('net')

const newSocket = (socket) => {
    socket.write('test telnet server')
}

var server = net.createServer(newSocket);

server.listen(8888)