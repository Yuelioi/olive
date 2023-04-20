import type { Server, Socket } from 'socket.io'
import type { Message } from '@/types/client'
import { EventTypes } from './event'

import { event_preprocessor, event_postprocessor } from './functions'

/**
 * 播放器管理
 */
export default (io: Server, socket: Socket) => {
    const onVideoSync = (message: Message) => {
        event_preprocessor(message)

        if (message.type === EventTypes.VIDEO.SYNC) {
            1
        } else {
            io.emit(EventTypes.VIDEO.NAME, message)
        }

        event_postprocessor(message)
    }

    socket.on(EventTypes.VIDEO.NAME, onVideoSync)
}
