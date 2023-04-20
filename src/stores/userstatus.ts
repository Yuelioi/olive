import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Socket } from 'socket.io-client'

export const useStatusStore = defineStore('userData', () => {
    const username = ref('')
    const usertype = ref('')
    const roomId = ref('')
    const password = ref('')
    const joinPassword = ref('')
    const capacity = ref(10)
    const onlineUsers = ref(1)
    const isJoined = ref(false)
    const message = ref('')
    const clientId = ref('')

    const userInfoInit = () => {
        username.value = username.value || localStorage.getItem('username') || 'Anonymous'
        roomId.value = roomId.value || localStorage.getItem('roomId') || ''
        usertype.value = usertype.value || localStorage.getItem('usertype') || 'user'
        password.value = password.value
            ? joinPassword.value
            : localStorage.getItem('password') || ''
        joinPassword.value = joinPassword.value || localStorage.getItem('joinPassword') || ''
        clientId.value = clientId.value || sessionStorage.getItem('clientId') || ''
    }
    const client = ref<Socket>()

    return {
        username,
        isJoined,
        usertype,
        message,
        onlineUsers,
        roomId,
        password,
        joinPassword,
        capacity,
        client,
        clientId,
        userInfoInit
    } as {
        username: typeof username
        isJoined: typeof isJoined
        usertype: typeof usertype
        message: typeof message
        onlineUsers: typeof onlineUsers
        roomId: typeof roomId
        password: typeof password
        joinPassword: typeof joinPassword
        capacity: typeof capacity
        userInfoInit: typeof userInfoInit
        client: any
        clientId: typeof clientId
    }
})
