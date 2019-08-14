const users = require('./src/users')
const net = require('net')
const actions = require('./src/actions')
const chalk = require('chalk')


/**
* Cleans the input of carriage return, newline
*/
function cleanInput(data) {
    return data.toString().replace(/(\r\n|\n|\r)/gm,'')
}
//TODO
//disable names like help or exit
//let user post more than one word
//reduce code in main
const receiveData = (socket, data) => {
    var cleanData = cleanInput(data);
    const tokens = cleanData.split(' ')
    const tokenCount = tokens.length
    if (tokenCount == 1) {
        if (tokens[0] === 'exit') {
            socket.end('Closing connection\n')
        } else if (tokens[0] === 'help') {
            printHelp(socket)
        } else if (tokens[0] === 'list') {
            socket.write(users.listAllUsers())
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
            socket.write('unrecognized command\n')
        }
    } else if (tokenCount == 3) {
        if (tokens[1] === '->') {
            socket.write(actions.post(tokens[0], tokens[2]))
        } else if (tokens[1] == 'follows') {
            socket.write(actions.follow(tokens[0], tokens[2]))
        } else {
            socket.write('unrecognized command\n')
        }
    } else {
        socket.write('unrecognized command\n')
    }
}

/**
 * Function called when a new user connects
 * @param {socket} socket 
 */
const newSocket = (socket) => {
    socket.write(chalk.green('Welcome to Twitter-Light\n'))
    socket.write('Type help for a list of commands\n')
    socket.on('data', (data) => {
        receiveData(socket, data)
    })

}

const printHelp = (socket) => {
    socket.write(chalk.blue('list all users:') + '\tlist\n')
    socket.write(chalk.blue('create user:') + '\tcreate (user)\n')
    socket.write(chalk.blue('delete user:') +'\tdelete (user)\n')
    socket.write(chalk.blue('posting:') + '\t(user) -> (message)\n')
    socket.write(chalk.blue('reading:') + '\t(user)\n')
    socket.write(chalk.blue('following:') + '\t(user) follows (another user)\n')
    socket.write(chalk.blue('wall:') + '\t\t(user) wall\n')
    socket.write(chalk.blue('exit:') + '\t\texit\n')
}

var server = net.createServer(newSocket);

server.listen(8888)