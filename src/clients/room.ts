import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { EventTypes } from '@/configs/event'

const store = useStatusStore()
const { username, roomId, usertype, password, isJoined, client, capacity, sessionId } =
    storeToRefs(store)

store.userInfoInit()

export const registerRoom = () => {
    console.log('客户端注册')

    // 连接后
    const msg = {
        type: usertype.value === 'user' ? EventTypes.ROOM.JOIN : EventTypes.ROOM.CREATE,
        username: username.value,
        roomId: roomId.value,
        password: password.value,
        sessionId: sessionId.value,
        capacity: capacity.value
    }

    client.value.emit(EventTypes.ROOM.NAME, msg)

    client.value.on(EventTypes.ROOM.NAME, (msg: any) => {
        console.log(msg)
        if (msg.type == EventTypes.ROOM.CREATE) {
            if (msg.status) {
                isJoined.value = true
            } else {
                isJoined.value = false
            }
        } else if (msg.type == EventTypes.ROOM.JOIN) {
            if (msg.status) {
                isJoined.value = true
            } else {
                isJoined.value = false
            }
        }
    })
}

export const leaveRoom = () => {
    client.value.emit(EventTypes.ROOM.NAME, {
        type: EventTypes.ROOM.LEAVE,
        usertype: usertype.value,
        username: username.value,
        roomId: roomId.value,
        sessionId: sessionId.value
    })

    client.value.close()
}
