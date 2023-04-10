import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { EventTypes } from '@/configs/data'

import type { Socket } from 'socket.io-client'

const store = useStatusStore()
const { username, roomId, usertype, password, joinPassword, isJoined, capacity } =
    storeToRefs(store)

store.userInfoInit()

export const registerRoom = (client: Socket) => {
    console.log('客户端注册')

    client.on(EventTypes.CONNECT.NAME, () => {
        const msg = {
            type: usertype.value === 'user' ? EventTypes.ROOM.JOIN : EventTypes.ROOM.CREATE,
            username: username.value,
            roomId: roomId.value,
            password: password.value,
            clientId: client.id,
            capacity: 0
        }

        client.emit(EventTypes.ROOM.NAME, msg)
    })

    client.on(EventTypes.ROOM.NAME, (msg: any) => {
        if (msg.type == 'join') {
            if (msg.status) {
                console.log('加入成功')
                isJoined.value = true
            } else {
                isJoined.value = false
                alert('加入失败,房间不存在或者密码错误')
            }
        }
    })
}
