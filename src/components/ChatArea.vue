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
import { useStatusStore } from '@/stores/userstatus'
import { registerChat } from '@/clients/chat'

import { EventTypes } from '@/configs/event'

import type { Message } from '@/types/client'

const store = useStatusStore()
const { username, client } = storeToRefs(store)

const message = ref('')
const messages = ref<Message[]>([])

const sendMessage = () => {
    client.value.emit(EventTypes.MESSAGE.NAME, {
        type: EventTypes.MESSAGE.USER,
        username: username.value,
        message: message.value
    })
    message.value = ''
}

onMounted(() => {
    // 监听连接成功事件

    registerChat(client.value, messages)
})
</script>
