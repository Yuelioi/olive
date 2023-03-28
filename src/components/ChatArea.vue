<template>
    <div>
        <input type="text" v-model="username" />
        <br />
        <input type="text" v-model="message" /><br />
        <button @click="sendMessage">Send</button>
        <ul>
            <li v-for="msg in messages" :key="msg.id">{{ msg.message }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Message {
    type: string
    id?: number
    username: string
    message: string
}

enum MessageType {
    Log = 'logger',
    User = 'user_msg'
}

const message = ref('')
const username = ref('')
const messages = ref<Message[]>([]) // 显式指定类型

// const socket = defineProps(['socket']).socket

const sendMessage = () => {
    const client = props.client
    console.log(client)
    client.emit('message', {
        type: MessageType.User,
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
            case MessageType.Log:
                messages.value.push({
                    type: MessageType.Log,
                    id: Date.now(),
                    username: username.value,
                    message: msg.message
                })
                break
            case MessageType.User:
                messages.value.push({
                    type: MessageType.User,
                    id: Date.now(),
                    username: username.value,
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
