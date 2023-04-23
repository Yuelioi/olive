import type { Server, Socket } from 'socket.io'

import { EventTypes } from './event'
import { roomManage } from './data'

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
            onlineUsers: io.of('/').sockets.size
        }
    }

    const get_room_users = (roomId: string) => {
        console.log(roomManage.rooms)
        console.log(roomManage.getRoomUsers(roomId))
        return {
            type: EventTypes.SERVER.GET_ROOM_USERS,
            roomUsers: roomManage.getRoomUsers(roomId)
        }
    }
    /**
     * 向客户端发送服务器人数
     * @param message
     */
    const onServerUpdate = (message: any) => {
        switch (message.type) {
            case EventTypes.SERVER.GET_SERVER_USERS:
                io.emit(EventTypes.SERVER.NAME, get_server_users())
                break
            case EventTypes.SERVER.GET_ROOM_USERS:
                io.emit(EventTypes.SERVER.NAME, get_room_users(message.roomId))
                break
        }
    }

    /**
     * 定时更新数据
     */
    // setInterval(() => {
    //     io.emit(EventTypes.SERVER.NAME, get_server_users())
    // }, 1000 * 5)

    socket.on(EventTypes.SERVER.NAME, onServerUpdate)
}
