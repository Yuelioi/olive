// socket 的各种事件
export const EventTypes = {
    MESSAGE: {
        NAME: 'message',
        ADMIN: 'admin',
        USER: 'user',
        SYSTEM: 'system'
    },
    PLAYLIST: {
        NAME: 'playlist',
        GET_VIDEOS: 'get_video_playlist'
    },
    ROOM: {
        NAME: 'room',
        CREATE: 'create-room',
        JOIN: 'join-room',
        LEAVE: 'leave-room'
    },
    SERVER: {
        NAME: 'server',
        GET_SERVER_USERS: 'get_server_users',
        GET_ROOM_USERS: 'get_room_users'
    },

    VIDEO: {
        NAME: 'vide',
        SEEK: 'seek',
        PAUSE: 'pause',
        PLAY: 'play',
        RESTART: 'restart',
        URL: 'url',
        SYNC: 'sync'
    },

    USER: {
        SEND_MESSAGE: 'send_message'
    }
}
