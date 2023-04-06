import type { Server, Socket } from 'socket.io'


/**
 * @description: Server Chat MOD, Emit source message to all clients
 */
export default (io: Server, socket: Socket): void => {
    const onMessageReceived = (message: string): void => {
        io.emit('message', message)
    }
    socket.on('message', onMessageReceived)
}
