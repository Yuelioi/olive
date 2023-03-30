import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import type { Socket } from 'socket.io-client'
const store = useStatusStore()
store.userInfoInit()
const { username, roomId, usertype, password, numbers, joinPassword } = storeToRefs(store)

export const registerRoom = (client: Socket) => {
    client.on('connect', () => {
        if (usertype.value == 'owner') {
            client.emit('room', {
                type: 'create',
                username: username.value,
                roomId: roomId.value,
                password: password.value,
                numbers: numbers.value,
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

    client.on('system', (msg: any) => {
        if (msg.status) {
            console.log('加入成功')
        } else {
            alert('加入失败,房间不存在或者密码错误')
        }
    })
}
