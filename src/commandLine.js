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
    const unfilteredWords = command.split(' ')
    //remove all empty strings after split
    const words = unfilteredWords.filter((array) => array.length > 0)
    const wordCount = words.length

    //Check for single word commands
    if (wordCount == 1) {
        if (words[0] === 'exit') {
            return 'closing connection\n'
        } else if (words[0] === 'help') {
            return printHelp()
        } else if (words[0] === 'list') {
            return users.listAllUsers()
        } else {
            //command is a name
            return actions.read(words[0])
        }
    } 

    //Check for post (token count unknown)
    if (words[1] === '->') {
        return actions.post(words[0], buildPost(words))
    }

    //Check for double word commands
    if (wordCount == 2) {
        if (words[1] === 'wall') {
            return actions.wall(words[0])
        } else if (words[0] === 'create') {
            return users.addUser(words[1])
        } else if (words[0] === 'delete') {
            return users.removeUser(words[1])
        } else {
            return 'unrecognized command\n'
        }
    }
    
    //Check for triple word commands
    if (wordCount == 3) {
        if (words[1] == 'follows') {
            return actions.follow(words[0], words[2])
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


//Reconstructs the post message from words
const buildPost = (words) => {
    words.shift()
    words.shift()
    post = ''
    words.forEach(token => {
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
