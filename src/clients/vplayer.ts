import type { Message } from '@/types/client'
import type { Socket, Artplayer } from '@/types/global'

import { usePlayerStore } from '@/stores/player'
// import { storeToRefs } from 'pinia'
// const { videos } = storeToRefs(usePlayerStore())
const { updateVideos } = usePlayerStore()

import { useStatusStore } from '@/stores/userstatus'
import { storeToRefs } from 'pinia'
const store = useStatusStore()
const { roomId, usertype } = storeToRefs(store)

export const registerPlayerClient = (client: Socket, art: Artplayer) => {
    client.on('video-list', (msg: Message) => {
        switch (msg.type) {
            case 'get':
                updateVideos(msg.message.playlist)
                break
        }
    })

    client.on('video-control', (msg: Message) => {
        switch (msg.type) {
            case 'seek':
                if (usertype.value == 'user' && roomId == msg.message.roomId) {
                    art.currentTime = msg.message.currentTime
                }
                break
            case 'pause':
                if (usertype.value == 'user' && roomId == msg.message.roomId) {
                    art.pause()
                }
                break
            case 'play':
                if (usertype.value == 'user' && roomId == msg.message.roomId) {
                    art.play()
                }
                break
            case 'url':
                if (usertype.value == 'user' && roomId == msg.message.roomId) {
                    art.url = msg.message.url
                }
                break
        }
    })
}
