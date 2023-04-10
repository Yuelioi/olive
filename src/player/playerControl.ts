import type { Artplayer } from '@/types/global'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

import { EventTypes } from '@/configs/data'

const store = useStatusStore()
const { roomId, username, client, usertype } = storeToRefs(store)

export const registerPlayerController = (art: Artplayer) => {
    art.on('video:canplay', () => {
        console.info('video:canplay')
    })

    art.on('restart', () => {
        console.info('video:canplay')
    })

    art.on('pause', () => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.PAUSE,
                username: username.value,
                message: {
                    roomId: roomId
                }
            })
        }
    })

    art.on('play', () => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.PLAY,
                username: username.value,
                message: {
                    roomId: roomId
                }
            })
        }
    })

    art.on('url', (url: string) => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.URL,
                username: username.value,
                message: {
                    roomId: roomId,
                    url: url
                }
            })
        }
    })

    art.on('seek', (currentTime: number) => {
        if (usertype.value == 'owner') {
            client.value.emit(EventTypes.VIDEO.NAME, {
                type: EventTypes.VIDEO.SEEK,
                username: username.value,
                message: {
                    currentTime: currentTime,
                    roomId: roomId
                }
            })
        }
    })
}
