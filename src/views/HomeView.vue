<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import Header from '@/components/HeaderTop.vue'

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/userstatus'
import { io } from 'socket.io-client'
import { ClientData } from '@/configs/data'
import type { Message } from '@/types/client'
import { MessageType } from '@/configs/data'

const router = useRouter()
const store = useStatusStore()
store.userInfoInit()
const { username, roomId, usertype, password, joinPassword, capacity, client, onlineUsers } =
    storeToRefs(store)

client.value = io(`localhost:${ClientData.port}`)

client.value.on('connect', () => {
    client.value.emit('info', {
        type: 'get_users',
        usertype: usertype.value,
        username: username.value,
        clientId: client.value.id
    })

    client.value.on(MessageType.INFO, (msg: Message) => {
        console.log(msg)
        switch (msg.type) {
            // 获取在线人数
            case 'get_user_number':
                onlineUsers.value = msg.message.onlineUsers
                break
        }
    })
})

const createRoom = () => {
    // 生成随机的房间ID
    roomId.value = Math.random().toString(36).substring(2, 8)
    usertype.value = 'owner'

    // 跳转到新生成的房间页面
    router.push({
        name: `Room`,
        params: {
            roomId: roomId.value
        }
    })

    localStorage.setItem('roomId', roomId.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('usertype', usertype.value)
    localStorage.setItem('password', password.value)
    localStorage.setItem('joinPassword', joinPassword.value)
}
const joinRoom = () => {
    usertype.value = 'user'

    if (roomId.value) {
        // 跳转到指定的房间页面
        router.push({
            name: `Room`,
            params: {
                roomId: roomId.value
            }
        })
    }
    localStorage.setItem('roomId', roomId.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('usertype', usertype.value)
    localStorage.setItem('password', password.value)
    localStorage.setItem('joinPassword', joinPassword.value)
}
</script>

<template>
    <main>
        <Header />
        <TheWelcome />
        <MyForm />
        <label for="username">用户名:</label>
        <input type="text" name="username" v-model="username" />
        <br />
        <label for="password">密码:</label>
        <input type="text" name="password" v-model="password" />
        <label for="capacity">人数:</label>
        <input type="text" name="capacity" v-model="capacity" />
        <button @click="createRoom">创建房间</button>
        <br />
        <label for="roomId">房间号:</label>
        <input type="text" name="roomId" v-model="roomId" />
        <label for="joinPassword">密码:</label>
        <input type="text" name="joinPassword" v-model="joinPassword" />
        <button @click="joinRoom">加入房间</button>

        <p>{{ onlineUsers }}</p>
    </main>
</template>
