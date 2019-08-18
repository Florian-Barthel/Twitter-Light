const fs = require('fs')
const users = require('./users')
const errorMessages = require('./errorMessages')


/**
 * Creates a post with the given content and saves it in users.
 * @param {string} name 
 * @param {string} content 
 */
const post = (name, content) => {
    const allUsers = users.loadUsers()
    const user = allUsers.find((user) => user.name.toLowerCase() === name.toLowerCase() )

    if (!user) {
        return errorMessages.userNotFound(name)
    }
    user.posts.push({
        content,
        time: Date.now()
    })

    users.saveUsers(allUsers)
    return user.name + ' has succesfully posted on the timeline.\n'
}


/**
 * Returns the newsfeed for user (name)
 * @param {string} name 
 */
const wall = (name) => {
    var allPosts = []
    
    const user = users.getUserByName(name)
    if (!user) {
        return errorMessages.userNotFound(name)
    }
    
    //get all own posts from user (name)
    user.posts.forEach((post) => {
        //push all posts with additional author attribute
        allPosts.push({
            author: user.name,
            content: post.content,
            time: post.time
        })
    })

    //get all users that the user (name) has subscribed
    user.following.forEach((followingUserName) => {
        followingUser = users.getUserByName(followingUserName)
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
    var result = '\nTimeline from ' + user.name + ':\n'
    allPosts.forEach((post) => {
        result += '  ' + post.author +' - ' + post.content + calcTimeDifference(post.time) + '\n'
    });
    result += '\n'
    return result
}


/**
 * Adds the user (nameToFollow) to the list following in user (name)
 * @param {string} name 
 * @param {string} nameToFollow 
 */
const follow = (name, nameToFollow) => {
    //Load and find both users
    const allUsers = users.loadUsers()
    const myUser = allUsers.find((user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    const userToFollow = users.getUserByName(nameToFollow)
    
    //Return an error when one of the users does not exist
    if (!myUser) {
        return errorMessages.userNotFound(name)
    } else if (!userToFollow) {
        return errorMessages.userNotFound(nameToFollow)
    }
    
    //Return a message when the user is already following
    const userAlreadyFollowing = myUser.following.find((followingName) => followingName.toLocaleLowerCase() === nameToFollow.toLocaleLowerCase())
    if (userAlreadyFollowing) {
        return myUser.name + ' is already following' + userToFollow.name + '\n'
    }

    //Follow the user and save it to the userlist
    myUser.following.push(userToFollow.name)
    users.saveUsers(allUsers)
    return myUser.name + ' is now following ' + userToFollow.name + '\n'
}

/**
 * Removes a user (nameToUnfollow) from the following array of user (name)
 * @param {String} name 
 * @param {String} nameToUnfollow 
 */
const unfollow = (name, nameToUnfollow)  => {
    //Load and find both users
    const allUsers = users.loadUsers()
    const myUser = allUsers.find((user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    const userToUnfollow = users.getUserByName(nameToUnfollow)

    //Return an error when one of the users does not exist
    if (!myUser) {
        return errorMessages.userNotFound(name)
    } else if (!userToUnfollow) {
        return errorMessages.userNotFound(nameToUnfollow)
    }

    //Return a message when the user is already not following the other user
    const userAlreadyFollowing = myUser.following.find((followingName) => followingName.toLocaleLowerCase() === nameToUnfollow.toLocaleLowerCase())
    if (!userAlreadyFollowing) {
        return myUser.name + ' is already not following ' + userToUnfollow.name + '\n'
    }

    //Unfollow the user and save it to the userlist
    myUser.following = myUser.following.filter((followingName) => followingName.toLowerCase() !== nameToUnfollow.toLowerCase())
    users.saveUsers(allUsers)
    return myUser.name + ' is no longer following ' + userToUnfollow.name + '\n'
}


/**
 * Returns all posts from the user (name)
 * @param {string} name 
 */
const read = (name) => {
    const user = users.getUserByName(name)

    if (!user) { 
        return errorMessages.userNotFound(name)
    }
    
    var posts = user.posts
    if (posts.length == 0) {
        return user.name + ' has no posts yet\n'
    }

    //Sort post by time decreasing
    posts.sort((a, b) => {
        return b.time - a.time
    })

    var result = '\nAll posts from ' + user.name + ':\n'
    posts.forEach((post) => {
        result += '  ' + user.name +' - ' + post.content + calcTimeDifference(post.time) + '\n'
    });
    result += '\n'
    return result
}


/**
 * Returns the past time with a given time (rounded for h, min, sec)
 * @param {number} time 
 */
const calcTimeDifference = (time) => {
    var difference = Math.floor(Date.now() / 1000) - Math.floor(time / 1000)
    if (difference >= (60 * 60 * 24)) {
        difference = Math.floor(difference / (60 * 60 * 24))
        return ' (' + difference + ' d ago)'
    }else if (difference >= (60 * 60)) {
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
    unfollow,
    read,
    calcTimeDifference
}