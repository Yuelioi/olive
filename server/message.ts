import type { Server, Socket } from 'socket.io'
import { EventTypes } from './event'

import { event_preprocessor, event_postprocessor } from './functions'

/**
 * @description: 聊天室模块, 将消息原样发送给所有客户端
 */
export default (io: Server, socket: Socket): void => {
    const onMessageReceived = (message: any): void => {
        event_preprocessor(message)
        io.emit(EventTypes.MESSAGE.NAME, message)
        event_postprocessor(message)
    }
    socket.on(EventTypes.MESSAGE.NAME, onMessageReceived)
}
