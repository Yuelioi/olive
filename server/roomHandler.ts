import type { Server, Socket } from 'socket.io'
import { Rooms, changeRooms } from './data'

export default (io: Server, socket: Socket) => {
    const roomManage = (message: any) => {
        // 获取io现有房间
        socket.leave(socket.id)
        const rooms = io.of('/').adapter.rooms
        const roomList = [...rooms.keys()]
        console.log(roomList)
        changeRooms(Rooms.filter((room) => roomList.includes(room.roomId)))

        // 更新房间的用户
        for (const room of Rooms) {
            const roomSockets = io.sockets.adapter.rooms.get(room.roomId)
            if (roomSockets) {
                const socketArray = Array.from(roomSockets)
                room.clientIds = socketArray
            }
        }
        console.log(Rooms)
        switch (message.type) {
            case 'create':
                socket.join(message.roomId)
                if (!roomList.includes(message.roomId)) {
                    socket.join(message.roomId)
                }

                Rooms.push({
                    roomId: message.roomId,
                    owner: message.username,
                    clientIds: [socket.id],
                    password: message.password,
                    capacity: message.capacity
                })

                socket.emit('room', {
                    type: 'join',
                    username: message.username,
                    roomId: message.roomId,
                    message: '成功加入房间',
                    status: true
                })

                break
            case 'join':
                {
                    // console.log(Rooms)
                    // console.log(message.roomId)
                    const roomIndex = Rooms.findIndex((room) => room.roomId === message.roomId)
                    // console.log(roomIndex)
                    // console.log(Rooms[roomIndex].clientIds.length < Rooms[roomIndex].capacity)
                    // console.log(Rooms[roomIndex].password === message.password)

                    // 如果有房间, 并且没满
                    if (
                        roomIndex !== -1 &&
                        Rooms[roomIndex].clientIds.length < Rooms[roomIndex].capacity &&
                        Rooms[roomIndex].password === message.password
                    ) {
                        socket.join(Rooms[roomIndex].roomId)

                        Rooms[roomIndex].clientIds.push(socket.id)
                        socket.emit('room', {
                            type: 'join',
                            username: message.username,
                            roomId: message.roomId,
                            message: '成功加入房间',
                            status: true
                        })
                    } else {
                        socket.emit('room', {
                            type: 'join',
                            username: message.username,
                            roomId: message.roomId,
                            message: '房间不存在,密码错误或者人数已满',
                            status: false
                        })
                    }
                }

                break
            case 'leave': {
                const roomIndex = Rooms.findIndex((room) => room.roomId === message.roomId)
                if (roomIndex !== -1) {
                    if (
                        message.usertype === 'owner' &&
                        message.username === Rooms[roomIndex].owner
                    ) {
                        io.emit('message', {
                            type: 'leave',
                            username: message.username,
                            roomId: message.roomId,
                            message: '房主已解散房间'
                        })
                        Rooms.splice(roomIndex, 1)
                        io.socketsLeave(message.roomId)
                    } else {
                        io.emit('room', {
                            type: 'leave',
                            username: message.username,
                            roomId: message.roomId,
                            message: '用户离开房间'
                        })
                        const clientIds = Rooms[roomIndex].clientIds
                        const cid = clientIds.findIndex((item) => item === message.clientId)
                        if (cid !== -1) {
                            clientIds.splice(cid, 1)
                        }
                        socket.leave(message.roomId)
                    }
                }
            }
        }
        console.log(Rooms)
    }
    socket.on('room', roomManage)
}
