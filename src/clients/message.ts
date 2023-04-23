import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { EventTypes } from '@/configs/event'

import type { Ref } from 'vue'
import type { Socket } from 'socket.io-client'

const store = useStatusStore()
store.userInfoInit()

const { roomId, client, username, message } = storeToRefs(store)

export const registerMessage = (client: Socket, messages: Ref<any[]>) => {
    client.on('connect', () => {
        console.log(`聊天已成功连接${roomId.value}`)
    })

    // 监听服务器发来的消息
    client.on(EventTypes.MESSAGE.NAME, (msg: any) => {
        switch (msg.type) {
            case EventTypes.MESSAGE.SYSTEM:
                messages.value.push({
                    type: EventTypes.MESSAGE.SYSTEM,
                    id: Date.now(),
                    username: 'system',
                    message: msg.message
                })
                break
            case EventTypes.MESSAGE.USER:
                messages.value.push({
                    type: EventTypes.MESSAGE.USER,
                    id: Date.now(),
                    username: msg.username,
                    message: msg.message
                })
                break
        }
    })
}

export const sendMessage = () => {
    client.value.emit(EventTypes.MESSAGE.NAME, {
        type: EventTypes.MESSAGE.USER,
        username: username.value,
        message: message.value
    })
    message.value = ''
}
