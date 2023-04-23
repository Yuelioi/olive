import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/userstatus'

import { EventTypes } from '@/configs/event'

import type { Socket, Artplayer } from '@/types/global'

const store = useStatusStore()
const { roomId, usertype } = storeToRefs(store)

/**
 * 注册客户端接受 video 事件
 * @param client
 * @param art
 */
export const registerVideoClient = (client: Socket, art: Artplayer) => {
    client.on(EventTypes.VIDEO.NAME, (msg: any) => {
        console.log(msg)
        if (usertype.value == 'user' && roomId.value == msg.roomId) {
            switch (msg.type) {
                case EventTypes.VIDEO.SEEK:
                    art.currentTime = msg.currentTime
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
                    art.url = msg.url
                    break
                case EventTypes.VIDEO.SYNC:
                    art.currentTime = msg.currentTime
                    if (msg.playing) {
                        art.play()
                    } else {
                        art.pause()
                    }
                    break
            }
        }
    })
}
