import type { Artplayer } from '@/types/global'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

import { EventTypes } from '@/configs/event'

const store = useStatusStore()
const { roomId, username, client, usertype } = storeToRefs(store)

export const registerPlayerController = (art: Artplayer) => {
    art.on('video:canplay', () => {
        console.info('video:canplay')
    })

    art.on('restart', () => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.RESTART,
                username: username.value,
                roomId: roomId.value
            })
        }
    })

    art.on('pause', () => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.PAUSE,
                username: username.value,
                roomId: roomId.value
            })
        }
    })

    art.on('play', () => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.PLAY,
                username: username.value,
                roomId: roomId.value
            })
        }
    })

    art.on('url', (url: string) => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.URL,
                username: username.value,
                roomId: roomId.value,
                url: url
            })
        }
    })

    art.on('seek', (currentTime: number) => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.SEEK,
                username: username.value,
                currentTime: currentTime,
                roomId: roomId.value
            })
        }
    })
}
