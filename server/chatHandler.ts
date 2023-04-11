import type { Server, Socket } from 'socket.io'
import { EventTypes } from './event'

/**
 * @description: 聊天室模块, 将消息原样发送给所有客户端
 */
export default (io: Server, socket: Socket): void => {
    const onMessageReceived = (message: string): void => {
        io.emit(EventTypes.MESSAGE.NAME, message)
    }
    socket.on(EventTypes.MESSAGE.NAME, onMessageReceived)
}
