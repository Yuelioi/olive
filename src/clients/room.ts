import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import type { Socket } from 'socket.io-client'

const store = useStatusStore()

const { username, roomId, usertype, password, joinPassword, isJoined, capacity } =
    storeToRefs(store)

store.userInfoInit()

export const registerRoom = (client: Socket) => {
    console.log('客户端注册')

    client.on('connect', () => {
        if (usertype.value == 'owner') {
            client.emit('room', {
                type: 'create',
                username: username.value,
                roomId: roomId.value,
                password: password.value,
                capacity: capacity.value,
                clientId: client.id
            })
        }
        if (usertype.value == 'user') {
            client.emit('room', {
                type: 'join',
                username: username.value,
                roomId: roomId.value,
                password: joinPassword.value,
                clientId: client.id
            })
        }
    })

    client.on('room', (msg: any) => {
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
