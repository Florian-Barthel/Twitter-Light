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


test('make a post', () => {
    
})