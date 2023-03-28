const http = require('http')
const server = http.createServer()

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('Client connected')

    socket.on('message', (message) => {
        console.log('Received message:', message)
        // socket.emit('message', message) // 将消息发送回当前客户端
        io.emit('message', message) // 将消息发送回全部客户端
    })

    socket.emit('message', { type: 'logger', username: '系统', message: '欢迎你,新的到访者' })
})

server.listen(8080, () => {
    console.log('Server is running on port 8080') // 这里改为 8080
})
