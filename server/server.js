const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer()
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})
let rooms = []
const connectedClients = io.sockets.sockets
io.on('connection', (socket) => {
    console.log('Client connected')

    const onMessageReceived = (message) => {
        console.log('Received message:', message)
        io.emit('message', message)
    }
    const onVideoSync = (message) => {
        console.log('Received VideoSync:', message)
        io.emit('message', message)
    }
    const roomManage = (message) => {
        console.log(message)
        switch (message.type) {
            case 'create':
                if (!rooms.find((room) => room.roomId === message.roomId)) {
                    rooms.push({
                        roomId: message.roomId,
                        username: message.username,
                        password: message.password || '',
                        numbers: message.numbers || 100,
                        currentNumber: 1,
                        clientIds: [message.clientId]
                    })
                }

                break
            case 'join':
                {
                    const room = rooms.find(
                        (element) =>
                            element.roomId === message.roomId &&
                            element.password === message.password &&
                            element.currentNumber < element.numbers
                    )

                    if (room) {
                        console.log('加入成功')
                        socket.emit('system', {
                            type: 'system',
                            username: message.username,
                            roomId: message.roomId,
                            message: '成功加入房间',
                            status: true
                        })
                        if (!room.clientIds.find((clientId) => clientId === message.clientId)) {
                            room.currentNumber += 1
                            room.clientIds.push(message.clientId)
                        }
                    } else {
                        console.log('加入失败')
                        socket.emit('system', {
                            type: 'join',
                            username: message.username,
                            roomId: message.roomId,
                            message: '房间不存在或者密码错误',
                            status: false
                        })
                    }
                    console.log(rooms)
                    console.log(connectedClients)
                    // Log the IDs of all connected clients
                    console.log('Connected clients:', Object.keys(connectedClients))

                    // Log the IP address of each connected client
                    Object.values(connectedClients).forEach((client) => {
                        console.log(`Client ${client.id} IP address: ${client.handshake.address}`)
                    })
                }

                break
            case 'leave': {
                console.log('服务端准备卸载')
                const res = rooms.findIndex((item) => item.roomId === message.roomId)
                if (res !== -1) {
                    if (message.usertype === 'owner') {
                        io.emit('message', {
                            type: 'leave',
                            username: message.username,
                            roomId: message.roomId,
                            message: '房主已解散该房间'
                        })
                        rooms.splice(res, 1)
                    } else {
                        io.emit('message', {
                            type: 'leave',
                            username: message.username,
                            roomId: message.roomId,
                            message: '离开房间该房间'
                        })
                        let clientIds = rooms[res].clientIds
                        const cid = clientIds.findIndex((item) => item === message.clientId)
                        if (cid !== -1) {
                            clientIds.splice(cid, 1)
                            rooms[res].currentNumber -= 1
                        }
                    }
                    console.log('卸载完毕')
                }
            }
        }
    }

    const onVideoControl = (message) => {
        console.log('Received message:', message)
        io.emit('message', message)
    }

    socket.on('message', onMessageReceived)
    socket.on('room', roomManage)
    socket.on('video-sync', onVideoSync)
    socket.on('video-control', onVideoControl)
})

server.listen(8080, () => {
    console.log('Server is running on port 8080') // 这里改为 8080
})
