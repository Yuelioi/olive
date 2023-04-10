import type { Server, Socket } from 'socket.io'
import type { Message } from '@/types/client'

export default (io: Server, socket: Socket) => {
    const onInfo = (message: Message) => {
        switch (message.type) {
            case 'get_user_number':
                break
        }
        io.emit('info', {
            type: 'get_user_number',
            message: {
                onlineUsers: io.of('/').sockets.size
            }
        })
    }

    // 定时更新数据
    setInterval(() => {
        io.emit('info', {
            type: 'get_user_number',
            message: {
                onlineUsers: io.of('/').sockets.size
            }
        })
    }, 1000 * 5)

    socket.on('info', onInfo)
}
