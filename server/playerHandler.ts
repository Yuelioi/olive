import type { Server, Socket } from 'socket.io'
import type { Message } from '@/types/client'
import { roomManage } from './data'

export default (io: Server, socket: Socket) => {
    const onVideoList = (message: Message) => {
        switch (message.type) {
            case 'create':
                break
        }
        io.emit('message', {
            type: 'video',
            roomManage
        })
    }
    const onVideoSync = (message: Message) => {
        io.emit('message', message)
    }

    const onVideoControl = (message: Message) => {
        io.emit('message', message)
    }

    socket.on('video-list', onVideoList)
    socket.on('video-sync', onVideoSync)
    socket.on('video-control', onVideoControl)
}
