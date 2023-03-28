<template>
    <div>
        <input type="text" v-model="message" />
        <button @click="sendMessage">Send</button>
        <ul>
            <li v-for="msg in messages" :key="msg.id">{{ msg.content }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { io } from 'socket.io-client'
const url = 'http://localhost:8080'
const socket = io(url, {})

const message = ref('')
const messages = ref<{ id: number; content: string }[]>([]) // 显式指定类型

// 监听连接成功事件
socket.on('connect', () => {
    console.log('Connected to server')
})

// 监听服务器发来的消息
socket.on('message', (message) => {
    console.log(message)
    messages.value.push({ id: Date.now(), content: message })
})

const sendMessage = () => {
    socket.emit('message', message.value)
    message.value = ''
}

onMounted(() => {
    // some code to run on mount
})
</script>
