const fs = require('fs')
const users = require('./users')
const errormessages = require('./errormessages')


/**
 * Creates a post with the given content and saves it in users.
 * @param {string} name 
 * @param {string} content 
 */
const post = (name, content) => {
    const allUsers = users.loadUsers()

    const user = allUsers.find((user) => user.name === name)

    if (user) {
        user.posts.push({
            content,
            time: Math.floor(Date.now() / 1000)
        })
        users.saveUsers(allUsers)
        return 'Succesfully pushed to timeline.'
    } else {
        return errormessages.userNotFound(name)
    }
}


/**
 * Returns the newsfeed for user (name)
 * @param {string} name 
 */
const wall = (name) => {
    //TODO:
    //get all posts from user (name)
    //get all posts from following users
    //sort all posts by time
    //print all posts in the correct order
}


/**
 * Adds the user (nameToFollow) to the list following in user (name)
 * @param {string} name 
 * @param {string} nameToFollow 
 */
const follow = (name, nameToFollow) => {
    const allUsers = users.loadUsers()

    const user = allUsers.find((user) => user.name === name)
    const userToFollow = allUsers.find((user) => user.name === nameToFollow)

    if (!user) {
        return errormessages.userNotFound(name)
    } else if (!userToFollow) {
        return errormessages.userNotFound(nameToFollow)
    } else {
        user.following.push(nameToFollow)
        users.saveUsers(allUsers)
        return name + ' in now following ' + nameToFollow + '.'
    }
}


/**
 * Returns all posts from the user (name)
 * @param {string} name 
 */
const read = (name) => {
    const allUsers = users.loadUsers()

    const user = allUsers.find((user) => user.name === name)

    if (user) {
        var result = ''
        user.posts.forEach((post) => {
            result += name +': ' + post.content + calcTimeDifference(post.time) + '\n'
        });
        return result
    } else {
        return errormessages.userNotFound(name)
    }
}


/**
 * Returns the past time with a given time (rounded for h, min, sec)
 * @param {number} time 
 */
const calcTimeDifference = (time) => {
    var difference = Math.floor(Date.now() / 1000) - time
    if (difference >= (60 * 60)) {
        difference = Math.floor(difference / (60 * 60))
        return ' (' + difference + ' h ago)'
    } else if (difference >= (60)) {
        difference = Math.floor(difference / 60)
        return ' (' + difference + ' min ago)'
    } else {

        return ' (' + difference + ' sec ago)'
    }
}

module.exports = {
    post,
    wall,
    follow,
    read
}