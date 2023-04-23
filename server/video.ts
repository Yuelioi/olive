import type { Server, Socket } from 'socket.io'
import { EventTypes } from './event'

import { event_preprocessor, event_postprocessor } from './functions'

/**
 * 播放器管理
 */
export default (io: Server, socket: Socket) => {
    const onVideoSync = (message: any) => {
        event_preprocessor(message)

        if (message.type === EventTypes.VIDEO.SYNC) {
            io.emit(EventTypes.VIDEO.NAME, message)
        } else {
            io.emit(EventTypes.VIDEO.NAME, message)
        }

        event_postprocessor(message)
    }

    socket.on(EventTypes.VIDEO.NAME, onVideoSync)
}
