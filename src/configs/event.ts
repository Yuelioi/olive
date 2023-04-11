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
