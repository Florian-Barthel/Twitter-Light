// const commandLine = require('../src/commandLine')
// const users = require('../src/users')

// const userOne = 'userOne'
// const userTwo = 'userTwo'
// var saveCurrentUsers = users.loadUsers()


// beforeAll(() => {
//     saveCurrentUsers = users.loadUsers()
//     users.removeAll()
//     users.addUser(userOne)
//     users.addUser(userTwo)
// })


// afterAll(() => {
//     users.removeAll()
//     users.saveUsers(saveCurrentUsers)
// })


// test('create / delete (test case senitive)', () => {
//     var answer = ''
//     answer = commandLine.handleCommand('create newUser')
//     expect(answer).toBe('User newUser was created.\n')

//     answer = commandLine.handleCommand('delete newuser')
//     expect(answer).toBe('User newUser was removed.\n')
// })


// test('userOne follows userTwo, both post to timeline, then read wall of userOne (test case senitive)', () => {
//     var answer = ''
//     answer = commandLine.handleCommand('userone follows usertwo')
//     expect(answer).toBe('userOne is now following userTwo.\n')

//     answer = commandLine.handleCommand('userone -> post from userone.')
//     expect(answer).toBe('userOne has succesfully posted on the timeline.\n')

//     answer = commandLine.handleCommand('usertwo -> post from usertwo.')
//     expect(answer).toBe('userTwo has succesfully posted on the timeline.\n')
    
//     answer = commandLine.handleCommand('userone wall')
//     //Split the answer in lines and delete the empty lines
//     const lines = answer.split('\n').filter((string) => string.length > 0)
//     expect(lines[0]).toBe('Timeline from userOne:')
//     expect(lines[1].substr(2, 28)).toBe('userTwo - post from usertwo.')

//     expect(lines[2].substr(2, 28)).toBe('userOne - post from userone.')
// })

// test('post and read form a new user (test case senitive)', () => {
//     var answer = ''
//     answer = commandLine.handleCommand('create newUserPostTest')
//     expect(answer).toBe('User newUserPostTest was created.\n')

//     answer = commandLine.handleCommand('newuserposttest -> post from newUserPostTest.')
//     expect(answer).toBe('newUserPostTest has succesfully posted on the timeline.\n')

//     answer = commandLine.handleCommand('newuserposttest')
//     expect(answer).toBe('\nAll posts from newUserPostTest:\n  newUserPostTest - post from newUserPostTest.  (0 sec ago)\n\n')
// })