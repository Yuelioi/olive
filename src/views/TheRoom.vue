<template>
    <section v-show="isJoined">
        <div>
            <h2>房间 {{ roomId }}</h2>
            <h2>用户名 {{ username }}</h2>

            <ChatArea id="chat-area" />
            <vPlayer />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'

import ChatArea from '@/components/ChatArea.vue'
import vPlayer from '@/components/VideoPlayer.vue'

import { registerRoom } from '@/clients/room'
import { ClientData } from '@/configs/data'
import { io } from 'socket.io-client'

import { useStatusStore } from '@/stores/userstatus'
import { storeToRefs } from 'pinia'

const { username, roomId, usertype, isJoined, client } = storeToRefs(useStatusStore())

if (!roomId) {
    window.location.href = ClientData.host
}

client.value = io(`localhost:${ClientData.port}`)
onMounted(() => {
    console.log(client.value)
    registerRoom(client.value)
})

onBeforeUnmount(() => {
    console.log('客户端卸载')
    client.value.emit('room', {
        type: 'leave',
        usertype: usertype.value,
        username: username.value,
        roomId: roomId.value,
        clientId: client.value.id
    })

    client.value.close()
})
</script>
