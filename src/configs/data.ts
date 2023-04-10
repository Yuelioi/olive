// import type { Video } from './../../server/types'
// TODO 名字不好 晚点改

export const ClientData = {
    port: 8081,
    host: 'http://localhost:5173/'
}

export const EventTypes = {
    SYSTEM: {
        NAME: 'system',
        GET_USER_NUMBER: 'get_user_number'
    },
    ROOM: {
        NAME: 'room',
        CREATE: 'create-room',
        JOIN: 'join-room',
        LEAVE: 'leave',
        GET_PLAYLIST: 'get_playlist'
    },
    VIDEO: {
        NAME: 'video',
        SEEK: 'seek',
        PAUSE: 'pause',
        PLAY: 'play',
        URL: 'url',
        SYNC: 'sync'
    },
    USER: {
        SEND_MESSAGE: 'send_message'
    },
    MESSAGE: {
        NAME: 'message',
        USER: 'user',
        SYSTEM: 'system'
    }
}

export const vOptions = {
    isLive: false,
    muted: false,
    autoplay: false,
    pip: true,
    autoSize: true,
    autoMini: true,
    screenshot: true,
    setting: true,
    loop: false,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: '#23ade5'
}
