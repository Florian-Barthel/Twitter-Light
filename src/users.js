const fs = require('fs')
const errormessages = require('./errormessages')


/**
 * creates a user with name, following [], posts []
 * and saves it to users.json
 * @param {string} name 
 */
const addUser = (name) => {
    const users = loadUsers()
    const duplicateUsers = users.find((user) => user.name === name)

    if (duplicateUsers) {
        return 'This username is already taken.'
    } else {
        //create a new user with the given username
        users.push({
            name,
            following: [],
            posts: []
        })
        saveUsers(users)
        return 'User ' + name + ' was created.'
    }
}


/**
 * Removes the user and all follower connections.
 * @param {string} name 
 */
const removeUser = (name) => {
    const users = loadUsers()

    //removes the user from the array
    const filteredUsers = users.filter((user) => user.name !== name)

    //removes the user from every follower array
    filteredUsers.forEach((user) => {
        user.following = user.following.filter((followingName) => followingName !== name)
    })

    
    if (users.length == filteredUsers.length) {
        return errormessages.userNotFound(name)
    } else {
        saveUsers(filteredUsers)
        return 'User ' + name + ' was removed.'
    }
}


/**
 * Saves users to users.json
 * @param {list} users 
 */
const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users)
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


const removeAll = () => {
    saveUsers([])
}


module.exports = {
    addUser,
    removeUser,
    saveUsers,
    loadUsers,
    removeAll
}