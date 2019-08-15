const actions = require('./actions')
const users = require('./users')
const net = require('net')
const chalk = require('chalk')


/**
 * Calls the functions in users / actions with input data
 * and returns the output
 * @param {string} data 
 * @param {socket} socket 
 */
const handleCommand = (data, socket) => {
    const command = cleanInput(data)
    const unfilteredTokens = command.split(' ')
    //remove all empty strings after split
    const tokens = unfilteredTokens.filter((array) => array.length > 0)
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
            //command is a name
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

    //no matching command was found
    return 'unrecognized command\n'
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


//Reconstructs the post message from tokens
const buildPost = (tokens) => {
    tokens.shift()
    tokens.shift()
    post = ''
    tokens.forEach(token => {
        post += token + ' '
    });
    return post
}


//Cleans the input of carriage return, newline
const cleanInput = (data) => {
    return data.toString().replace(/(\r\n|\n|\r)/gm,'')
}


const welcomeText = () => {
    return chalk.green('Welcome to Twitter-Light\n') + 'Type help for a list of all commands\n'
}


module.exports = ({
    handleCommand,
    welcomeText
})
