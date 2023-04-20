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

import { registerRoom, leaveRoom } from '@/clients/room'
import { ClientData } from '@/configs/config'

import { useStatusStore } from '@/stores/userstatus'
import { storeToRefs } from 'pinia'

import ChatArea from '@/components/ChatArea.vue'
import vPlayer from '@/components/VideoPlayer.vue'

const { roomId, username, isJoined } = storeToRefs(useStatusStore())

if (!roomId) {
    window.location.href = ClientData.host
}

onMounted(() => {
    registerRoom()
})

onBeforeUnmount(() => {
    leaveRoom()
})
</script>
