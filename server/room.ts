import type { Server, Socket } from 'socket.io'
import { roomManage } from './data'
import { EventTypes } from './event'

export default (io: Server, socket: Socket) => {
    /**
     * 管理房间加入离开
     * @param message
     */
    const roomHandler = (msg: any) => {
        console.log('预处理')
        console.log(roomManage.rooms)
        // 获取io现有房间
        const roomIds = [...io.of('/').adapter.rooms.keys()]
        console.log(roomIds)
        roomManage.filterRooms(roomIds)

        // 更新房间的用户
        for (const room of roomManage.rooms) {
            const roomSockets = io.sockets.adapter.rooms.get(room.roomId)
            room.sessionIds = roomSockets ? Array.from(roomSockets) : []
        }
        console.log('处理后')
        console.log(roomManage.rooms)

        switch (msg.type) {
            case EventTypes.ROOM.CREATE:
                if (!roomIds.includes(msg.roomId)) {
                    const curRooms = Array.from(socket.rooms)
                    curRooms.push(msg.roomId)
                    socket.join(curRooms)
                } else {
                    socket.emit(EventTypes.ROOM.NAME, {
                        type: EventTypes.ROOM.JOIN,
                        username: msg.username,
                        roomId: msg.roomId,
                        message: '房间已存在',
                        status: false
                    })
                    break
                }

                roomManage.addRoom(socket.id, msg.username)
                roomManage.addRoom(
                    msg.roomId,
                    msg.sessionId,
                    [msg.sessionId],
                    msg.password,
                    msg.capacity
                )

                socket.emit(EventTypes.ROOM.NAME, {
                    type: EventTypes.ROOM.CREATE,
                    username: msg.username,
                    roomId: msg.roomId,
                    message: '房间创建成功',
                    status: true
                })
                break
            case EventTypes.ROOM.JOIN:
                {
                    const room = roomManage.getRoomById(msg.roomId)

                    // 如果有房间, 并且没满
                    if (room) {
                        console.log(room.sessionIds?.length < room.capacity)
                        console.log(room.password === msg.password)
                    }
                    if (
                        room &&
                        room.sessionIds?.length < room.capacity &&
                        room.password === msg.password
                    ) {
                        const curRooms = Array.from(socket.rooms)
                        curRooms.push(msg.roomId)
                        socket.join(curRooms)

                        room.sessionIds.push(socket.id)
                        socket.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.JOIN,
                            username: msg.username,
                            roomId: msg.roomId,
                            message: '成功加入房间',
                            status: true
                        })
                        roomManage.addRoom(socket.id, msg.username)
                        roomManage.addUser(room, msg.sessionId)
                    } else {
                        socket.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.JOIN,
                            username: msg.username,
                            roomId: msg.roomId,
                            message: '房间不存在,密码错误或者人数已满',
                            status: false
                        })
                    }
                }
                break
            case EventTypes.ROOM.LEAVE: {
                const room = roomManage.getRoomById(msg.roomId)
                if (room) {
                    if (msg.usertype === 'owner' && msg.sessionId === room.owner) {
                        io.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.LEAVE,
                            username: msg.username,
                            roomId: msg.roomId,
                            message: '房主已解散房间'
                        })
                        roomManage.removeRoom(msg.roomId)
                        io.socketsLeave(msg.roomId)
                    } else {
                        io.emit(EventTypes.ROOM.NAME, {
                            type: EventTypes.ROOM.LEAVE,
                            username: msg.username,
                            roomId: msg.roomId,
                            message: '用户离开房间'
                        })
                        roomManage.removeUser(room, msg.roomId)
                        socket.leave(msg.roomId)
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
