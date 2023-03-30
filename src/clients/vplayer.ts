import type { Message } from '@/types/client'
import type { Socket, Artplayer } from '@/types/global'

export const registerPlayerClient = (client: Socket, art: Artplayer, props: any) => {
    const { usertype, roomId } = props
    client.on('video-control', (msg: Message) => {
        switch (msg.type) {
            case 'seek':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.currentTime = msg.message.currentTime
                }
                break
            case 'pause':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.pause()
                }
                break
            case 'play':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.play()
                }
                break
            case 'url':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.url = msg.message.url
                }
                break
        }
    })
}
