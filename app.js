const net = require('net')
const commandLine = require('./src/commandLine')


//handels the input from the command line
const receiveData = (socket, data) => {
    var answer = commandLine.handleCommand(data, socket)
    socket.write(answer)
    if (answer === 'closing connection\n') {
        socket.end()
    }
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
