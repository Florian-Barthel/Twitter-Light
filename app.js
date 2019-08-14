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
    socket.write(handleCommand(cleanData, socket))
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

const printHelp = () => {
    var text = ''
    text += chalk.blue('list all users:') + '\tlist\n'
    text += chalk.blue('create user:') + '\tcreate (user)\n'
    text += chalk.blue('delete user:') +'\tdelete (user)\n'
    text += chalk.blue('posting:') + '\t(user) -> (message)\n'
    text += chalk.blue('reading:') + '\t(user)\n'
    text += chalk.blue('following:') + '\t(user) follows (another user)\n'
    text += chalk.blue('wall:') + '\t\t(user) wall\n'
    text += chalk.blue('exit:') + '\t\texit\n'
    return text
}

/**
 * Reconstructs the post message from tokens
 * @param {array} tokens 
 */
const buildPost = (tokens) => {
    tokens.shift()
    tokens.shift()
    post = ''
    tokens.forEach(token => {
        post += token + ' '
    });
    return post
}

var server = net.createServer(newSocket);

server.listen(8888)

const handleCommand = (command, socket) => {
    const tokens = command.split(' ')
    const tokenCount = tokens.length


    //Check for single word commands
    if (tokenCount == 1) {
        if (tokens[0] === 'exit') {
            socket.end('Closing connection\n')
        } else if (tokens[0] === 'help') {
            return printHelp()
        } else if (tokens[0] === 'list') {
            return users.listAllUsers()
        } else {
            //call read function when no other command fits
            return actions.read(tokens[0])
        }
    } 

    //Check for post (token count unknown)
    if (tokens[1] === '->') {
        return actions.post(tokens[0], buildPost(tokens))
    }

    //Check for double word commands
    if (tokenCount == 2) {
        if (tokens[1] === 'wall') {
            return actions.wall(tokens[0])
        } else if (tokens[0] === 'create') {
            return users.addUser(tokens[1])
        } else if (tokens[0] === 'delete') {
            return users.removeUser(tokens[1])
        } else {
            return 'unrecognized command\n'
        }
    }
    
    //Check for triple word commands
    if (tokenCount == 3) {
        if (tokens[1] == 'follows') {
            return actions.follow(tokens[0], tokens[2])
        } else {
            return 'unrecognized command\n'
        }
    }

    //non of above
    return 'unrecognized command\n'
}