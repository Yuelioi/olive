<template>
    <section v-show="isJoined">
        <div>
            <h2>房间 {{ roomId }}</h2>
            <h2>用户名 {{ username }}</h2>
            {{ roomUsers }}

            <ChatArea id="chat-area" />
            <vPlayer />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'

import { registerRoom, leaveRoom } from '@/clients/room'
// import { ClientData } from '@/configs/config'

import { useStatusStore } from '@/stores/userstatus'
import { storeToRefs } from 'pinia'

import { registerServer } from '@/clients/server'
import ChatArea from '@/components/ChatArea.vue'
import vPlayer from '@/components/VideoPlayer.vue'

import { joinRoom } from '@/functions/room'
import { useRouter } from 'vue-router'
const router = useRouter()

const { roomId, username, isJoined, roomUsers } = storeToRefs(useStatusStore())

const checkId = () => {
    // 如果没有连接ID, 则返回首页
    // if (!roomId.value) {
    //     window.location.href = ClientData.host
    //     return
    // }
    const back = router.options.history.state.back
    // 如果不是从主页进 就更换ID
    if (back !== '/') {
        const path = window.location.pathname
        const segments = path.split('/') //
        const currentId = segments[segments.length - 1]
        roomId.value = currentId
        joinRoom(currentId)
    }

    // 如果ID与实际页面不符合, 则跳转至原来ID

    //

    // if (currentId != roomId.value) {
    //     window.location.href = `${ClientData.host}room/${roomId.value}`
    // }
}
checkId()
registerServer()
onMounted(() => {
    registerRoom()
})

onBeforeUnmount(() => {
    leaveRoom()
})
</script>
