const net = require('net')

/**
 * Setting up the Server for port 8888 
 */
const setup = () => {
    
    //each user has a socket
    var clients = []


    /**
    * Cleans the input of carriage return, newline
    */
    function cleanInput(data) {
        return data.toString().replace(/(\r\n|\n|\r)/gm,'')
    }

    const receiveData = (socket, data) => {
        var cleanData = cleanInput(data);
        if (cleanData === '@quit') {
            socket.end('Goodbye\n')
        }
        for (var i = 0; i < clients.length; i++) {
            if (clients[i] !== socket) {
                clients[i].write(data)
            }
        }
    }

    /**
     * Function called when a new user connects
     * @param socket 
     */
    const newSocket = (socket) => {
        clients.push(socket)
        socket.write('Welcome to Twitter-Light')
        socket.write('Type help for commands')
        socket.on('data', (data) => {
            receiveData(socket, data)
        })
        socket.on('end', () => {
            closeSocket(socket)
        })
    }

    const closeSocket = (socket) => {
        var index = clients.indexOf(socket)
        //index == -1 when element is not in array
        if (index != -1) {
            //removes the element
            clients.splice(index, 1)
        }
    }
    
    var server = net.createServer(newSocket);
    
    server.listen(8888)
}

module.exports = {
    setup
}