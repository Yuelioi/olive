<template>
    <section v-show="isJoined">
        <div>
            <h2>房间 {{ roomId }}</h2>
            <h2>用户名 {{ username }}</h2>

            <ChatArea id="chat-area" :client="client" :roomId="roomId" :usertype="usertype" />
            <vPlayer :client="client" :roomId="roomId" :usertype="usertype" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'

import ChatArea from '../components/ChatArea.vue'
import vPlayer from '../components/VideoPlayer.vue'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'
// import type { Socket } from 'socket.io-client'
import { registerRoom } from '../clients/room'
import { ClientData } from '@/configs/data'
const store = useStatusStore()
const { username, roomId, usertype, isJoined } = storeToRefs(store)
const client = store.userClient()

if (!roomId) {
    window.location.href = ClientData.host
}

onMounted(() => {
    registerRoom(client)
})

onBeforeUnmount(() => {
    console.log('卸载')
    client.emit('room', {
        type: 'leave',
        usertype: usertype.value,
        username: username.value,
        roomId: roomId.value,
        clientId: client.id
    })

    client.close()
})
</script>
