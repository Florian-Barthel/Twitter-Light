const net = require('net')
const commandLine = require('./src/commandLine')


//handels the input from the command line
const receiveData = (socket, data) => {
    socket.write(commandLine.handleCommand(data, socket))
}


//Function called when a new user connects
const newSocket = (socket) => {
    socket.write(commandLine.welcomeText())
    socket.on('data', (data) => {
        receiveData(socket, data)
    })

}

var server = net.createServer(newSocket);

server.listen(8888)
