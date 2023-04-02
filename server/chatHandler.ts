import type { Server, Socket } from 'socket.io'

export default (io: Server, socket: Socket): void => {
    const onMessageReceived = (message: string): void => {
        io.emit('message', message)
    }
    socket.on('message', onMessageReceived)
}
