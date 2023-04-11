import type { Server, Socket } from 'socket.io'
import type { Message } from '@/types/client'
import { EventTypes } from './event'

/**
 * 获取各种消息
 */
export default (io: Server, socket: Socket) => {
    const onInfo = (message: Message) => {
        switch (message.type) {
            case EventTypes.SERVER.GET_SERVER_USERS:
                break
        }
        io.emit(EventTypes.SERVER.NAME, {
            type: EventTypes.SERVER.GET_SERVER_USERS,
            message: {
                onlineUsers: io.of('/').sockets.size
            }
        })
    }

    // 定时更新数据
    setInterval(() => {
        io.emit(EventTypes.SERVER.NAME, {
            type: EventTypes.SERVER.GET_SERVER_USERS,
            message: {
                onlineUsers: io.of('/').sockets.size
            }
        })
    }, 1000 * 5)

    socket.on(EventTypes.SERVER.NAME, onInfo)
}
