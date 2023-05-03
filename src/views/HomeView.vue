<script setup lang="ts">
import Projects from '@/components/TheProjects.vue'
import Header from '@/components/HeaderTop.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/userstatus'
import { registerServer } from '@/clients/server'
import { joinRoom, createRoom } from '@/functions/room'

import { useRouter } from 'vue-router'
const router = useRouter()

const store = useStatusStore()
store.userInfoInit()
const { username, roomId, password, joinPassword, capacity, onlineUsers } = storeToRefs(store)

onMounted(() => {
    registerServer()
})
</script>

<template>
    <main>
        <Header />
        <Projects />
        <MyForm />
        <label for="username">用户名:</label>
        <input type="text" name="username" v-model="username" />
        <br />
        <label for="password">密码:</label>
        <input type="text" name="password" v-model="password" />
        <label for="capacity">人数:</label>
        <input type="text" name="capacity" v-model="capacity" />
        <button @click="createRoom(router)">创建房间</button>
        <br />
        <label for="roomId">房间号:</label>
        <input type="text" name="roomId" v-model="roomId" />
        <label for="joinPassword">密码:</label>
        <input type="text" name="joinPassword" v-model="joinPassword" />
        <button @click="joinRoom(router)">加入房间</button>

        <p>当前在线总人数:{{ onlineUsers }}</p>
    </main>
</template>
