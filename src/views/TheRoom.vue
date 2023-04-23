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

import { createRoom, joinRoom } from '@/functions/room'
import { EventTypes } from '@/configs/event'
import { useRouter } from 'vue-router'
const router = useRouter()

const { roomId, username, usertype, isJoined, roomUsers, client } = storeToRefs(useStatusStore())

const checkId = () => {
    const back = router.options.history.state.back
    // 如果不是从主页进 就更换ID
    if (back !== '/') {
        console.log('非主页加入')
        const path = window.location.pathname
        const segments = path.split('/') //
        const currentId = segments[segments.length - 1]
        console.log(currentId)
        // 如果当前连接与房间号不一致, 用户尝试加入, 房主则刷新连接
        if (roomId.value !== currentId) {
            if (usertype.value == 'user') {
                joinRoom(router, currentId)
            } else {
                router.push({
                    name: `Room`,
                    params: {
                        roomId: roomId.value
                    }
                })
            }
        } else {
            createRoom(router)
        }
    }
}
const checkUsers = (client: any) => {
    client.emit(EventTypes.SERVER.NAME, {
        type: EventTypes.SERVER.GET_ROOM_USERS,
        roomId: roomId.value
    })
}
// 先注册服务器
registerServer()
onMounted(() => {
    registerRoom()
    checkId()
    checkUsers(client.value)
})

onBeforeUnmount(() => {
    leaveRoom()
})
</script>
