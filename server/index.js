import { createServer } from 'http'
import { Server } from 'socket.io'
import registerRoomHandlers from './roomHandler.js'
import registerChatHandlers from './chatHandler.js'
import registerPlayerHandlers from './playerHandler.js'

const server = createServer()

server.listen(8080, () => {
    console.log('Server is running on port 8080')
})

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

const onConnection = (socket) => {
    registerRoomHandlers(io, socket)
    registerChatHandlers(io, socket)
    registerPlayerHandlers(io, socket)
}

io.on('connection', onConnection)
