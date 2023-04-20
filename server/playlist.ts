import type { Server, Socket } from 'socket.io'
import type { Message } from '@/types/client'
import { roomManage } from './data'
import { EventTypes } from './event'

/**
 * 播放器管理
 */
export default (io: Server, socket: Socket) => {
    // 管理视频播放器
    const onVideoList = (message: Message) => {
        switch (message.type) {
            case EventTypes.PLAYLIST.GET_VIDEOS:
                break
        }
        io.emit(EventTypes.PLAYLIST.NAME, {
            type: EventTypes.PLAYLIST.GET_VIDEOS,
            roomManage
        })
    }

    socket.on(EventTypes.PLAYLIST.NAME, onVideoList)
}
