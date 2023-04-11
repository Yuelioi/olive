import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { EventTypes } from '@/configs/event'

import type { Ref } from 'vue'
import type { Socket } from 'socket.io-client'
import type { Message } from '@/types/client'

const store = useStatusStore()
store.userInfoInit()

const { roomId } = storeToRefs(store)
export const registerChat = (client: Socket, messages: Ref<Message[]>) => {
    client.on('connect', () => {
        console.log(`聊天已成功连接${roomId.value}`)
    })

    // 监听服务器发来的消息
    client.on(EventTypes.MESSAGE.NAME, (msg: Message) => {
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
