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
import { registerMessage, sendMessage } from '@/clients/message'

import type { Message } from '@/types/client'

const store = useStatusStore()
const { username, client } = storeToRefs(store)

const message = ref('')
const messages = ref<Message[]>([])

onMounted(() => {
    // 注册消息事件
    registerMessage(client.value, messages)
})
</script>
