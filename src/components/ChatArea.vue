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
import { registerChat } from '../clients/chat'

import { MessageType } from '@/configs/data'
import type { Message } from '@/types/client'

const store = useStatusStore()

let { username } = storeToRefs(store)

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
    registerChat(client, messages)
})
</script>
