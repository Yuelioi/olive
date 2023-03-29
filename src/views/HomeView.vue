<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import Header from '../components/HeaderTop.vue'

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

const router = useRouter()
const store = useStatusStore()
store.userInfoInit()
let { username, roomId, usertype } = storeToRefs(store)

const createRoom = () => {
    // 生成随机的房间ID
    roomId.value = Math.random().toString(36).substring(2, 8)
    usertype.value = 'owner'

    // 跳转到新生成的房间页面
    router.push({
        name: `Room`,
        params: { roomId: roomId.value, usertype: usertype.value, username: username.value }
    })

    localStorage.setItem('username', username.value)
    localStorage.setItem('usertype', usertype.value)
    localStorage.setItem('roomId', roomId.value)
}
const joinRoom = () => {
    roomId.value = prompt('请输入房间ID') || ''
    usertype.value = 'user'

    if (roomId) {
        // 跳转到指定的房间页面
        router.push({
            name: `Room`,
            params: { roomId: roomId.value, usertype: usertype.value, username: username.value }
        })
    }

    localStorage.setItem('username', username.value)
    localStorage.setItem('usertype', usertype.value)
    localStorage.setItem('roomId', roomId.value)
}
</script>

<template>
    <main>
        <Header />
        <TheWelcome />
        <MyForm />
        <input type="text" name="" v-model="username" label="用户名" />
        <button @click="createRoom">创建房间</button>
        <button @click="joinRoom">加入房间</button>
    </main>
</template>
