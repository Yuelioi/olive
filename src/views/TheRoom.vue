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
import { io } from 'socket.io-client'
import { onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

import ChatArea from '../components/ChatArea.vue'
import vPlayer from '../components/VideoPlayer.vue'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

const store = useStatusStore()
store.userInfoInit()
let { username, roomId, usertype } = storeToRefs(store)

const route = useRoute()

console.log(route.params)
console.log(usertype)
console.log(username)
// const client = io(`localhost:8080/${roomId}`)
const client = io(`localhost:8080`)

onMounted(() => {
    client.on('connect', () => {
        console.log('Room Connected!')
    })
})

onBeforeUnmount(() => {
    client.close()
})
</script>
