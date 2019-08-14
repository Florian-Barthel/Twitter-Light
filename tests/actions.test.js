const actions = require('../src/actions')
const users = require('../src/users')

const userOne = 'test user 1'
const userTwo = 'test user 2'
var saveCurrentUsers = []


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