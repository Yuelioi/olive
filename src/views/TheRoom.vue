<template>
    <section>
        <div>
            <h2>房间 {{ roomId }}</h2>
            <h2>用户名 {{ username }}</h2>

            <ChatArea :client="client" :roomId="roomId" :usertype="usertype" />
            <vPlayer :client="client" :roomId="roomId" :usertype="usertype" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { io, Socket } from 'socket.io-client'
import { onMounted, onBeforeUnmount } from 'vue'

import ChatArea from '../components/ChatArea.vue'
import vPlayer from '../components/VideoPlayer.vue'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

import { registerRoom } from '../clients/room'

const store = useStatusStore()
let { host, username, roomId, usertype } = storeToRefs(store)

if (!roomId) {
    window.location.href = host.value
}

const client: Socket = io(`localhost:8080`)

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
