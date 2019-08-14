const users = require('../src/users')

const userDuplicate = 'testUser1UserTest'
const userDelete = 'deleteUserUserTest'
var saveCurrentUsers = users.loadUsers()


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
    expect(users.getUserByName('new user')).toBeDefined()
})


test('Create already existing user and expect it not to save', () => {
    users.addUser(userDuplicate)
    const currentUsers = users.loadUsers()
    const filteredUsers = currentUsers.filter((user) => user.name === userDuplicate)
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


test('Create casesensitive user and find it without casesensitive', () => {
    users.addUser('MyUser')
    expect(users.getUserByName('myuser')).toBeDefined()
})