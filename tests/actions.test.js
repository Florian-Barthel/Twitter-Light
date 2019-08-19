const actions = require('../src/actions')
const users = require('../src/users')

const userOne = 'testUser1ActionTest'
const userTwo = 'testUser2ActionTest'
const userOneFollow = 'testUser1FollowingTest'
const userTwoFollow = 'testUser2FollowingTest'
var saveCurrentUsers = users.loadUsers()


beforeAll(() => {
    saveCurrentUsers = users.loadUsers()
    users.removeAll()
    users.addUser(userOne)
    users.addUser(userTwo)
    users.addUser(userOneFollow)
    users.addUser(userTwoFollow)
    actions.follow(userOneFollow, userTwoFollow)
})


test('make a post', () => {
    actions.post(userOne, 'post 1')
    const myUser = users.getUserByName(userOne)
    expect(myUser.posts[0].content).toBe('post 1')
})


test('userOne follows userTwo', () => {
    actions.follow(userOne, userTwo)
    const myUser = users.getUserByName(userOne)
    expect(myUser.following[0]).toBe(userTwo)
})


test('userOneFollow unfollows userTwoFollow', () => {
    var myUser = users.getUserByName(userOneFollow)
    const lengthBefore = myUser.following.length
    actions.unfollow(userOneFollow, userTwoFollow)
    myUser = users.getUserByName(userOneFollow)
    const lengthAfter = myUser.following.length
    expect(lengthBefore).toBe(lengthAfter + 1)
})


test('calculate time difference', () => {
    const seconds = actions.calcTimeDifference(Date.now() - 1000)
    expect(seconds).toBe(' (1 sec ago)')

    const minutes = actions.calcTimeDifference(Date.now() - 1000 * 60)
    expect(minutes).toBe(' (1 min ago)')

    const hours = actions.calcTimeDifference(Date.now() - 1000 * 60 * 60)
    expect(hours).toBe(' (1 h ago)')

    const days = actions.calcTimeDifference(Date.now() - 1000 * 60 * 60 * 24)
    expect(days).toBe(' (1 d ago)')
})


afterAll(() => {
    users.removeAll()
    users.saveUsers(saveCurrentUsers)
})