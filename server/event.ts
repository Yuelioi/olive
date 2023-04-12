// socket 的各种事件
export const EventTypes = {
    SERVER: {
        NAME: 'server',
        GET_SERVER_USERS: 'get_server_users',
        GET_ROOM_USERS: 'get_room_users'
    },
    ROOM: {
        NAME: 'room',
        CREATE: 'create-room',
        JOIN: 'join-room',
        LEAVE: 'leave-room'
    },
    VIDEO: {
        NAME: 'vide',
        SEEK: 'seek',
        PAUSE: 'pause',
        PLAY: 'play',
        URL: 'url',
        SYNC: 'sync'
    },
    PLAYLIST: {
        NAME: 'playlist',
        GET_VIDEOS: 'get_video_playlist'
    },
    USER: {
        SEND_MESSAGE: 'send_message'
    },
    MESSAGE: {
        NAME: 'message',
        ADMIN: 'admin',
        USER: 'user',
        SYSTEM: 'system'
    }
}
