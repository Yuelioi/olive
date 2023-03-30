import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('userData', () => {
    const username = ref('')
    const usertype = ref('')
    const roomId = ref('')
    const password = ref('')
    const joinPassword = ''
    const numbers = 10
    const userInfoInit = () => {
        username.value = username.value
            ? username.value
            : localStorage.getItem('username') || 'Anonymous'

        roomId.value = roomId.value ? roomId.value : localStorage.getItem('roomId') || ''
        usertype.value = usertype.value
            ? usertype.value
            : localStorage.getItem('usertype') || 'user'
    }
    const host = 'http://localhost:5173/'

    const vOptions = {
        isLive: false,
        muted: false,
        autoplay: true,
        pip: true,
        autoSize: true,
        autoMini: true,
        screenshot: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        subtitleOffset: true,
        miniProgressBar: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        airplay: true,
        theme: '#23ade5'
    }

    return {
        host,
        username,
        usertype,
        roomId,
        password,
        joinPassword,
        numbers,
        userInfoInit,
        vOptions
    }
})
