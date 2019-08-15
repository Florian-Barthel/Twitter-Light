const actions = require('../src/actions')
const users = require('../src/users')

const userOne = 'testUser1ActionTest'
const userTwo = 'testUser2ActionTest'
var saveCurrentUsers = users.loadUsers()


beforeAll(() => {
    saveCurrentUsers = users.loadUsers()
    users.removeAll()
    users.addUser(userOne)
    users.addUser(userTwo)
})


afterAll(() => {
    users.removeAll()
    users.saveUsers(saveCurrentUsers)
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