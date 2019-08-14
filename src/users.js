const fs = require('fs')
const errormessages = require('./errormessages')


/**
 * creates a user with name, following [], posts []
 * and saves it to users.json
 * @param {string} name 
 */
const addUser = (name) => {
    const users = loadUsers()
    if (getUserByName(name)) {
        return 'This username is already taken.\n'
    } else if (name === 'help' || name === 'exit' || name === 'list') {
        return 'The names help / exit / list are not allowed.\n'
    } else {
        //create a new user with the given username
        users.push({
            name,
            following: [],
            posts: []
        })
        saveUsers(users)
        return 'User ' + name + ' was created.\n'
    }
}


/**
 * Removes the user and all follower connections.
 * @param {string} name 
 */
const removeUser = (name) => {
    const users = loadUsers()

    //removes the user from the array
    const filteredUsers = users.filter((user) => user.name.toLowerCase() !== name.toLowerCase())

    //removes the user from every follower array
    filteredUsers.forEach((user) => {
        user.following = user.following.filter((followingName) => followingName.toLowerCase() !== name.toLowerCase())
    })

    if (users.length == filteredUsers.length) {
        return errormessages.userNotFound(name)
    } else {
        saveUsers(filteredUsers)
        return 'User ' + name + ' was removed.\n'
    }
}


/**
 * Saves users to users.json
 * @param {list} users 
 */
const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users, undefined, 2)
    fs.writeFileSync('./src/users.json', dataJSON)
}


/**
 * Loads all users from users.json
 */
const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('./src/users.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


/**
 * Removes all users from json file
 */
const removeAll = () => {
    saveUsers([])
}


/**
 * Returns the User Object or undefined
 * @param {String} name 
 */
const getUserByName = (name) => {
    const currentUsers = loadUsers()
    const myUser = currentUsers.find((user) => user.name.toLowerCase() === name.toLowerCase())
    return myUser
}


const listAllUsers = () => {
    const currentUsers = loadUsers()
    if (!currentUsers) {
        return 'No users were created yet'
    }

    var result = 'List of all users:\n'
    currentUsers.forEach((user) => {
        result += user.name + '\n'
    })
    return result
}


module.exports = {
    addUser,
    removeUser,
    saveUsers,
    loadUsers,
    removeAll,
    getUserByName,
    listAllUsers
}