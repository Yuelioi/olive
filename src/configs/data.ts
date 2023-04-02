// TODO 名字不好 晚点改
export enum MessageType {
    SYSTEM = 'system',
    MESSAGE = 'message',
    ROOM = 'room'
}

export const ClientData = {
    port: 8080,
    host: 'http://localhost:5173/',
    capacity: 10
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
    loop: true,
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
