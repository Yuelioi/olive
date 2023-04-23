import type { Server, Socket } from 'socket.io'

import { roomManage } from './data'
import { EventTypes } from './event'

/**
 * 播放器管理
 */
export default (io: Server, socket: Socket) => {
    // 管理视频播放器
    const onVideoList = (msg: any) => {
        switch (msg.type) {
            case EventTypes.PLAYLIST.GET_VIDEOS:
                break
        }
        io.emit(EventTypes.PLAYLIST.NAME, {
            type: EventTypes.PLAYLIST.GET_VIDEOS,
            playlist: roomManage.getPlaylist(msg.roomId)
        })
    }

    socket.on(EventTypes.PLAYLIST.NAME, onVideoList)
}
