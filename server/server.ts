import type { Server, Socket } from 'socket.io'
import type { Message } from '@/types/client'
import { EventTypes } from './event'

/**
 * 获取服务器各种信息
 */
export default (io: Server, socket: Socket) => {
    /**
     * 获取服务器实际人数
     * @returns
     */
    const get_server_users = () => {
        return {
            type: EventTypes.SERVER.GET_SERVER_USERS,
            message: {
                onlineUsers: io.of('/').sockets.size
            }
        }
    }
    /**
     * 向客户端发送服务器人数
     * @param message
     */
    const onServerUpdate = (message: Message) => {
        switch (message.type) {
            case EventTypes.SERVER.GET_SERVER_USERS:
                break
        }
        io.emit(EventTypes.SERVER.NAME, get_server_users())
    }

    /**
     * 定时更新数据
     */
    // setInterval(() => {
    //     io.emit(EventTypes.SERVER.NAME, get_server_users())
    // }, 1000 * 5)

    socket.on(EventTypes.SERVER.NAME, onServerUpdate)
}
