export default (io, socket) => {
    const onMessageReceived = (message) => {
        console.log(socket.data.username)
        const rooms2 = io.sockets.adapter.rooms
        console.log(rooms2)
        // const count = io.engine.clientsCount
        console.log(socket.id)
        // for (let roomName in rooms) {
        //     console.log(`Room ${roomName}:`)
        //     const room = io.sockets.in(roomName)
        //     for (let socketId in room.sockets) {
        //         console.log(`  Socket ${socketId}`)
        //     }
        // }
        // console.log('Received message:', message)
        io.emit('message', message)
    }
    socket.on('message', onMessageReceived)
}
