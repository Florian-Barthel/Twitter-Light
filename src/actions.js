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
        return name + ' has succesfully pushed to timeline.'
    } else {
        return errormessages.userNotFound(name)
    }
}


/**
 * Returns the newsfeed for user (name)
 * @param {string} name 
 */
const wall = (name) => {
    var allPosts = []

    //get all own posts from user (name)
    const allUsers = users.loadUsers()
    const user = allUsers.find((user) => user.name === name)
    if (user) {
        user.posts.forEach((post) => {
            //push all posts with additional author attribute
            allPosts.push({
                author: name,
                content: post.content,
                time: post.time
            })
        })
    
        //get all users that the user (name) has subscribed
        const allFollowingUsers = user.following
        allFollowingUsers.forEach((followingUserName) => {
            //get the subscribed user by name
            followingUser = allUsers.find((findFollowingUser) => findFollowingUser.name === followingUserName)
            //get all posts from subscribed users
            followingUser.posts.forEach((post) => {
                //push all posts with additional author attribute
                allPosts.push({
                    author: followingUserName,
                    content: post.content,
                    time: post.time
                })
            })
        })
    
        //sort all posts by time
        allPosts.sort((a, b) => {
            return b.time - a.time
        })
    
        //print all posts in the correct order
        var result = 'Timeline from ' + name + ':\n'
        allPosts.forEach((post) => {
            result += post.author +': ' + post.content + calcTimeDifference(post.time) + '\n'
        });
        return result
    } else {
        return errormessages.userNotFound(name)
    }
}


/**
 * Adds the user (nameSubscribeTo) to the list following in user (name)
 * @param {string} name 
 * @param {string} nameSubscribeTo 
 */
const follow = (name, nameSubscribeTo) => {
    const allUsers = users.loadUsers()

    const user = allUsers.find((user) => user.name === name)
    const userToFollow = allUsers.find((user) => user.name === nameSubscribeTo)
    const userAlreadyFollowing = user.following.find((followingName) => followingName === nameSubscribeTo)

    if (!user) {
        return errormessages.userNotFound(name)
    } else if (!userToFollow) {
        return errormessages.userNotFound(nameSubscribeTo)
    } else if (userAlreadyFollowing) {
        return name + ' is already subscribed to ' + nameSubscribeTo
    } else {
        user.following.push(nameSubscribeTo)
        users.saveUsers(allUsers)
        return name + ' in now following ' + nameSubscribeTo + '.'
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
        var result = 'All posts from ' + name + ':\n'
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