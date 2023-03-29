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

import ChatArea from '../components/ChatArea.vue'
import vPlayer from '../components/VideoPlayer.vue'

import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/userstatus'

const store = useStatusStore()
let { username, roomId, usertype, password, numbers, joinPassword } = storeToRefs(store)
store.userInfoInit()

if (!roomId) {
    window.location.href = 'http://localhost:5173/'
}

const client = io(`localhost:8080`)

onMounted(() => {
    client.on('connect', () => {
        if (usertype.value == 'owner') {
            client.emit('room', {
                type: 'create',
                username: username.value,
                roomId: roomId.value,
                password: password.value,
                numbers: numbers.value,
                clientId: client.id
            })
        }
        if (usertype.value == 'user') {
            client.emit('room', {
                type: 'join',
                username: username.value,
                roomId: roomId.value,
                password: joinPassword.value,
                clientId: client.id
            })
        }
    })

    client.on('system', (msg: any) => {
        if (msg.status) {
            console.log('加入成功')
        } else {
            alert('加入失败,房间不存在或者密码错误')
        }
    })
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
