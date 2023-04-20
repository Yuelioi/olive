import type { Server, Socket } from 'socket.io'
import { roomManage } from './data'
import { EventTypes } from './event'

export default (io: Server, socket: Socket) => {
    /**
     * 管理房间加入离开
     * @param message
     */
    const roomHandler = (message: any) => {
        console.log('预处理')
        console.log(roomManage.rooms)
        // 获取io现有房间
        const roomIds = [...io.of('/').adapter.rooms.keys()]
        console.log(roomIds)
        roomManage.filterRooms(roomIds)

        // 更新房间的用户
        for (const room of roomManage.rooms) {
            const roomSockets = io.sockets.adapter.rooms.get(room.roomId)
            room.clientIds = roomSockets ? Array.from(roomSockets) : []
        }
        console.log('处理后')
        console.log(roomManage.rooms)

        switch (message.type) {
            case EventTypes.ROOM.CREATE:
                if (!roomIds.includes(message.roomId)) {
                    const curRooms = Array.from(socket.rooms)
                    curRooms.push(message.roomId)
                    socket.join(curRooms)
                } else {
                    socket.emit(EventTypes.ROOM.NAME, {
                        type: EventTypes.ROOM.JOIN,
                        username: message.username,
                        roomId: message.roomId,
                        message: '房间已存在',
                        status: false
                    })
                    break
                }

                roomManage.addRoom(socket.id, message.username)
                roomManage.addRoom(
                    message.roomId,
                    message.username,
                    [socket.id],
                    message.password,
                    message.capacity
                )

                socket.emit(EventTypes.ROOM.NAME, {
                    type: EventTypes.ROOM.CREATE,
                    username: message.username,
                    roomId: message.roomId,
                    message: '房间创建成功',
                    status: true
                })
                break
            case EventTypes.ROOM.JOIN:
                {
                    const room = roomManage.getRoomById(message.roomId)

                    // 如果有房间, 并且没满
                    if (room) {
                        console.log(room.clientIds?.length < room.capacity)
                        console.log(room.password === message.password)
                    }
                    if (
                        room &&
                        room.clientIds?.length < room.capacity &&
                        room.password === message.password
                    ) {
                        const curRooms = Array.from(socket.rooms)
                        curRooms.push(message.roomId)
                        socket.join(curRooms)

                        room.clientIds.push(socket.id)
                        socket.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.JOIN,
                            username: message.username,
                            roomId: message.roomId,
                            message: '成功加入房间',
                            status: true
                        })
                        roomManage.addRoom(socket.id, message.username)
                        roomManage.addUser(room, message.clientId)
                    } else {
                        socket.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.JOIN,
                            username: message.username,
                            roomId: message.roomId,
                            message: '房间不存在,密码错误或者人数已满',
                            status: false
                        })
                    }
                }
                break
            case EventTypes.ROOM.LEAVE: {
                const room = roomManage.getRoomById(message.roomId)
                if (room) {
                    if (message.usertype === 'owner' && message.username === room.owner) {
                        io.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.LEAVE,
                            username: message.username,
                            roomId: message.roomId,
                            message: '房主已解散房间'
                        })
                        roomManage.removeRoom(message.roomId)
                        io.socketsLeave(message.roomId)
                    } else {
                        io.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.LEAVE,
                            username: message.username,
                            roomId: message.roomId,
                            message: '用户离开房间'
                        })
                        roomManage.removeUser(room, message.roomId)
                        socket.leave(message.roomId)
                    }
                }
                break
            }
        }
        console.log('执行后')
        console.log(roomManage.rooms)
    }
    socket.on(EventTypes.ROOM.NAME, roomHandler)
}
