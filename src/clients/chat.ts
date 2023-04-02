import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
import { MessageType } from '@/configs/data'
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
    client.on('message', (msg: Message) => {
        switch (msg.type) {
            case MessageType.SYSTEM:
                messages.value.push({
                    type: MessageType.SYSTEM,
                    id: Date.now(),
                    username: msg.username,
                    message: msg.message
                })
                break
            case MessageType.MESSAGE:
                messages.value.push({
                    type: MessageType.MESSAGE,
                    id: Date.now(),
                    username: msg.username,
                    message: msg.message
                })
                break
            // add more cases for other message types here
            default:
                // handle unknown message types
                break
        }
    })
}
