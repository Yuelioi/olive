// TODO 名字不好 晚点改
export enum MessageType {
    SYSTEM = 'system',
    MESSAGE = 'message',
    ROOM = 'room',
    INFO = 'info'
}

export const ClientData = {
    port: 8081,
    host: 'http://localhost:5173/'
}

export const eventTypes = {
    info: {
        name: 'info',
        GET_USER_NUMBER: 'get_user_number'
    },
    user: {
        SEND_MESSAGE: 'send_message'
    },
    message: {}
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
