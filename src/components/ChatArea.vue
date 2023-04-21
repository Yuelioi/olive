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
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/userstatus'
import { registerMessage, sendMessage } from '@/clients/message'

const store = useStatusStore()
const { username, client, messages, message } = storeToRefs(store)

onBeforeMount(() => {
    registerMessage(client.value, messages)
})
</script>
