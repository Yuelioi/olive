import type { Artplayer } from '@/types/global'

export const registerPlayerController = (art: Artplayer) => {
    const props = defineProps(['client', 'roomId', 'usertype', 'username', 'vOptions'])
    const client = props.client
    const roomId = props.roomId
    const usertype = props.usertype
    art.on('video:canplay', () => {
        console.info('video:canplay')
    })

    art.on('restart', () => {
        console.info('video:canplay')
    })

    art.on('pause', () => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'pause',
                username: props.username,
                message: {
                    roomId: roomId
                }
            })
        }
    })

    art.on('play', () => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'play',
                username: props.username,
                message: {
                    roomId: roomId
                }
            })
        }
    })

    art.on('url', (url: string) => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'url',
                username: props.username,
                message: {
                    roomId: roomId,
                    url: url
                }
            })
        }
    })

    art.on('seek', (currentTime: number) => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'seek',
                username: props.username,
                message: {
                    currentTime: currentTime,
                    roomId: roomId
                }
            })
        }
    })
}
