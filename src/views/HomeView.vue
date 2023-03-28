<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import Header from '../components/HeaderTop.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const createRoom = () => {
    // 生成随机的房间ID
    const roomId = Math.random().toString(36).substring(2, 8)

    // 跳转到新生成的房间页面
    router.push({ name: `Room`, params: { roomId: roomId } })
}
const joinRoom = () => {
    const roomId = prompt('请输入房间ID')

    if (roomId) {
        // 跳转到指定的房间页面
        router.push({ name: `Room`, params: { roomId: roomId } })
    }
}
</script>

<template>
    <main>
        <Header />
        <TheWelcome />
        <MyForm />
        <button @click="createRoom">创建房间</button>
        <button @click="joinRoom">加入房间</button>
    </main>
</template>
