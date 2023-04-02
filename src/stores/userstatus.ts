import { ref } from 'vue'
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
// import type { Socket } from 'socket.io-client'
import { ClientData } from '@/configs/data'

export const useStatusStore = defineStore('userData', () => {
    const username = ref('')
    const usertype = ref('')
    const roomId = ref('')
    const password = ref('')
    const joinPassword = ref('')
    const isJoined = ref(false)

    const userInfoInit = () => {
        username.value = username.value
            ? username.value
            : localStorage.getItem('username') || 'Anonymous'

        roomId.value = roomId.value ? roomId.value : localStorage.getItem('roomId') || ''
        usertype.value = usertype.value
            ? usertype.value
            : localStorage.getItem('usertype') || 'user'
        password.value = password.value
            ? joinPassword.value
            : localStorage.getItem('password') || ''
        joinPassword.value = joinPassword.value
            ? joinPassword.value
            : localStorage.getItem('joinPassword') || ''
    }

    const userClient = () => {
        return io(`localhost:${ClientData.port}`)
    }

    return {
        username,
        isJoined,
        usertype,
        roomId,
        password,
        joinPassword,
        userClient,
        userInfoInit
    } as {
        username: typeof username
        isJoined: typeof isJoined
        usertype: typeof usertype
        roomId: typeof roomId
        password: typeof password
        joinPassword: typeof joinPassword
        userInfoInit: typeof userInfoInit
        userClient: any
    }
})
