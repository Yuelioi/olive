<template>
    <div>
        <input type="text" v-model="username" />
        <br />
        <input type="text" v-model="message" /><br />
        <button @click="sendMessage">Send</button>
        <ul>
            <li v-for="msg in messages" :key="msg.id">{{ msg.username + ':' + msg.message }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

const store = useStatusStore()
store.userInfoInit()
let { username } = storeToRefs(store)

interface Message {
    type: string
    id?: number
    username: string
    message: string
}

enum MessageType {
    SYSTEM = 'system',
    MESSAGE = 'message'
}

const message = ref('')

const messages = ref<Message[]>([])

const sendMessage = () => {
    const client = props.client

    client.emit('message', {
        type: MessageType.MESSAGE,
        username: username.value,
        message: message.value
    })
    message.value = ''
}
const props = defineProps(['client'])

onMounted(() => {
    // 监听连接成功事件

    const client = props.client
    client.on('connect', () => {
        console.log('Chat Connected')
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
})
</script>
