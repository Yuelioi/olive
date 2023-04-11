import type { Message } from '@/types/client'
import type { Socket, Artplayer } from '@/types/global'

import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { useStatusStore } from '@/stores/userstatus'

import { EventTypes } from '@/configs/event'

const { updateVideos } = usePlayerStore()
const store = useStatusStore()
const { roomId, usertype } = storeToRefs(store)

export const registerPlayerClient = (client: Socket, art: Artplayer) => {
    client.on(EventTypes.ROOM.NAME, (msg: Message) => {
        switch (msg.type) {
            case EventTypes.ROOM.GET_PLAYLIST:
                updateVideos(msg.message.playlist)
                break
        }
    })

    client.on(EventTypes.VIDEO.NAME, (msg: Message) => {
        if (usertype.value == 'user' && roomId == msg.message.roomId) {
            switch (msg.type) {
                case EventTypes.VIDEO.SEEK:
                    art.currentTime = msg.message.currentTime

                    break
                case EventTypes.VIDEO.PAUSE:
                    art.pause()

                    break
                case EventTypes.VIDEO.PLAY:
                    art.play()

                    break
                case EventTypes.VIDEO.URL:
                    art.url = msg.message.url

                    break
            }
        }
    })
}
