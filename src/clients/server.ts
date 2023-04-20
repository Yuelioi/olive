import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { EventTypes } from '@/configs/event'
import { io } from 'socket.io-client'
import { ClientData } from '@/configs/config'
import type { Message } from '@/types/client'
const store = useStatusStore()
const { username, usertype, client, onlineUsers, clientId } = storeToRefs(store)

store.userInfoInit()
console.log(clientId.value)

/**
 * 注册Server 以及获取Server信息
 */
export const registerServer = () => {
    if (clientId.value) {
        client.value = io(`localhost:${ClientData.port}`, {
            transports: ['websocket'],
            upgrade: false,
            query: {
                socketId: clientId.value
            }
        })
    } else {
        client.value = io(`localhost:${ClientData.port}`, {
            transports: ['websocket'],
            upgrade: false
        })
    }

    client.value.on('connect', () => {
        sessionStorage.setItem('clientId', client.value.id)
    })
    client.value.emit(EventTypes.SERVER.NAME, {
        type: EventTypes.SERVER.GET_SERVER_USERS,
        usertype: usertype.value,
        username: username.value,
        clientId: client.value.id
    })

    client.value.on(EventTypes.SERVER.NAME, (msg: Message) => {
        switch (msg.type) {
            // 获取在线人数
            case EventTypes.SERVER.GET_SERVER_USERS:
                onlineUsers.value = msg.message.onlineUsers
                break
        }
    })
}
