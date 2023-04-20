import type { Message } from '@/types/client'
import type { Socket } from '@/types/global'

import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { useStatusStore } from '@/stores/userstatus'

import { EventTypes } from '@/configs/event'

const { updateVideos } = usePlayerStore()
const store = useStatusStore()
storeToRefs(store)

export const registerPlaylistClient = (client: Socket) => {
    client.on(EventTypes.PLAYLIST.NAME, (msg: Message) => {
        switch (msg.type) {
            case EventTypes.PLAYLIST.GET_VIDEOS:
                updateVideos(msg.message.playlist)
                break
        }
    })
}
