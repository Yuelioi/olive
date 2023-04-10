import { createServer, Server as HTTPServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import registerRoomHandlers from './roomHandler'
import registerChatHandlers from './chatHandler'
import registerPlayerHandlers from './playerHandler'
import registerInfo from './info'

// import { Rooms } from './data'

const server: HTTPServer = createServer()
const port: number = 8081

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

const onConnection = (socket: Socket) => {
    // 当前连接数

    // // 查询rooms
    // const rooms = io.of('/').adapter.rooms

    // // 获取所有房间的列表
    // const roomList = [...rooms.keys()]
    // console.log('All rooms:', roomList)

    // 注册
    registerRoomHandlers(io, socket)
    registerChatHandlers(io, socket)
    registerPlayerHandlers(io, socket)
    registerInfo(io, socket)
}

io.on('connection', onConnection)
