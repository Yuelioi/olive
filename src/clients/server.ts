import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { EventTypes } from '@/configs/event'
import { io } from 'socket.io-client'
import { ClientData } from '@/configs/config'

const store = useStatusStore()
const { username, usertype, client, onlineUsers, sessionId, roomUsers } = storeToRefs(store)

/**
 * 注册Server 以及获取Server信息
 */
export const registerServer = () => {
    store.userInfoInit()
    if (sessionId.value.toString() !== 'undefined') {
        client.value = io(`localhost:${ClientData.port}`, {
            transports: ['websocket'],
            upgrade: false,
            query: {
                sessionId: sessionId.value
            }
        })
    } else {
        client.value = io(`localhost:${ClientData.port}`, {
            transports: ['websocket'],
            upgrade: false
        })

        sessionId.value = client.value.id

        sessionStorage.setItem('sessionId', sessionId.value)
    }

    client.value.on('connect', () => {
        if (sessionId.value) {
            console.log(client.value.id)
        } else {
            console.log(client.value.id)

            sessionId.value = client.value.id
            sessionStorage.setItem('sessionId', sessionId.value)
        }
    })

    // 获取服务器人数
    client.value.emit(EventTypes.SERVER.NAME, {
        type: EventTypes.SERVER.GET_SERVER_USERS,
        usertype: usertype.value,
        username: username.value,
        sessionId: client.value.id
    })

    client.value.on(EventTypes.SERVER.NAME, (msg: any) => {
        switch (msg.type) {
            // 获取在线人数
            case EventTypes.SERVER.GET_SERVER_USERS:
                onlineUsers.value = msg.onlineUsers
                break
            case EventTypes.SERVER.GET_ROOM_USERS:
                roomUsers.value = msg.roomUsers
                break
        }
    })
}
