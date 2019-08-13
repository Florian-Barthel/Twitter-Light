const users = require('../src/users')

const userDuplicate = 'test user 1'
const userDelete = 'test user 2'
var saveCurrentUsers = []


beforeAll(() => {
    saveCurrentUsers = users.loadUsers()
    users.removeAll()
    users.addUser(userDuplicate)
    users.addUser(userDelete)
})


afterAll(() => {
    users.removeAll()
    users.saveUsers(saveCurrentUsers)
})


test('Create user and save to json file', () => {
    users.addUser('new user')
    const currentUsers = users.loadUsers()
    const myUser = currentUsers.find((user) => user.name === 'new user')
    expect(myUser).toBeDefined()
})


test('Create already existing user and expect it not to save', () => {
    users.addUser(userDuplicate)
    const currentUsers = users.loadUsers()
    const filteredUsers = currentUsers.filter((user) => user.name === 'new user')
    expect(filteredUsers.length).toBe(1)
})


test('Delete user', () => {
    const lenghtBefore = users.loadUsers().length
    users.removeUser(userDelete)
    const lenghtAfter = users.loadUsers().length
    expect(lenghtBefore).toBe(lenghtAfter + 1)
})


test('Delete user that not exists', () => {
    const lenghtBefore = users.loadUsers().length
    users.removeUser('user not created yet')
    const lenghtAfter = users.loadUsers().length
    expect(lenghtBefore).toBe(lenghtAfter)
})