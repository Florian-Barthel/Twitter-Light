const users = require('./src/users')
const net = require('net')
const actions = require('./src/actions')

/**
* Cleans the input of carriage return, newline
*/
function cleanInput(data) {
    return data.toString().replace(/(\r\n|\n|\r)/gm,'')
}

const receiveData = (socket, data) => {
    var cleanData = cleanInput(data);
    const tokens = cleanData.split(' ')
    const tokenCount = tokens.length
    if (tokenCount == 1) {
        if (tokens[0] === 'exit') {
            socket.end('Closing connection\n')
        } else if (tokens[0] === 'help') {
            socket.write('create user: create (user)\n')
            socket.write('delete user: delete (user)\n')
            socket.write('posting: (user) post (message)\n')
            socket.write('reading: (user)\n')
            socket.write('following: (user) follows (another user)\n')
            socket.write('wall: (user) wall\n')
            socket.write('exit: exit\n')
        } else {
            socket.write(actions.read(tokens[0]))
        }
    } else if (tokenCount == 2) {
        if (tokens[1] === 'wall') {
            socket.write(actions.wall(tokens[0]))
        } else if (tokens[0] === 'create') {
            socket.write(users.addUser(tokens[1]))
        } else if (tokens[0] === 'delete') {
            socket.write(users.removeUser(tokens[1]))
        } else {
            socket.write('unrecognized command')
        }
    } else if (tokenCount == 3) {
        if (tokens[1] === 'post') {
            socket.write(actions.post(tokens[0], tokens[2]))
        } else if (tokens[1] == 'follows') {
            socket.write(actions.follow(tokens[0], tokens[2]))
        } else {
            socket.write('unrecognized command')
        }
    } else {
        socket.write('unrecognized command')
    }
}

/**
 * Function called when a new user connects
 * @param {socket} socket 
 */
const newSocket = (socket) => {
    socket.write('Welcome to Twitter-Light\n')
    socket.write('Type help for a list of commands\n')
    socket.on('data', (data) => {
        receiveData(socket, data)
    })

}


var server = net.createServer(newSocket);

server.listen(8888)