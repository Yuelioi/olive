import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('counter', () => {
    const username = ref('')
    const usertype = ref('')
    const roomId = ref('')
    const doubleCount = computed(() => username)
    const userInfoInit = () => {
        username.value = username.value
            ? username.value
            : localStorage.getItem('username') || 'Anonymous'

        roomId.value = roomId.value ? roomId.value : localStorage.getItem('roomId') || ''
        usertype.value = usertype.value
            ? usertype.value
            : localStorage.getItem('usertype') || 'user'
    }

    return { username, usertype, roomId, doubleCount, userInfoInit }
})
