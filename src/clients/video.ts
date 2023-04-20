import type { Message } from '@/types/client'
import type { Socket, Artplayer } from '@/types/global'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/userstatus'

import { EventTypes } from '@/configs/event'

const store = useStatusStore()
const { roomId, usertype } = storeToRefs(store)

export const registerVideoClient = (client: Socket, art: Artplayer) => {
    client.on(EventTypes.VIDEO.NAME, (msg: Message) => {
        if (usertype.value == 'user' && roomId.value == msg.message.roomId) {
            switch (msg.type) {
                case EventTypes.VIDEO.SEEK:
                    art.currentTime = msg.message.currentTime
                    break
                case EventTypes.VIDEO.PAUSE:
                    art.pause()
                    console.log('准备暂停')
                    break
                case EventTypes.VIDEO.PLAY:
                    art.play()
                    console.log('准备播放')
                    break
                case EventTypes.VIDEO.URL:
                    art.url = msg.message.url
                    break
            }
        }
    })
}
