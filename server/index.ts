import { createServer, Server as HTTPServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'

import registerMessage from './message'
import registerPlaylist from './playlist'
import registerRoom from './room'
import registerServer from './server'
import registerVideo from './video'

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

    const sessionId = socket.handshake.query.socketId

    if (sessionId) {
        1
    }

    // 注册

    registerMessage(io, socket)
    registerPlaylist(io, socket)
    registerRoom(io, socket)
    registerServer(io, socket)
    registerVideo(io, socket)
}

io.on('connection', onConnection)
