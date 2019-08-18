const chalk = require('chalk')

const userNotFound = (name) => {
    return 'User ' + chalk.red(name) + ' was not found.\n'
}

module.exports = {
    userNotFound
}
