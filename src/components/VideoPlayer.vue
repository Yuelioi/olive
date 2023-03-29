<template>
    <p>Player</p>
    更换视频<input type="text" :video="video" />
    <button @click="submit_video">提交视频</button>
    <div class="artplayer-app"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import Artplayer from 'artplayer'

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

interface Message {
    type: string
    id?: number
    username: string
    message: any
}

const submit_video = () => {
    art.url = url
}

const props = defineProps(['client', 'roomId', 'usertype', 'username'])
const video = ref('')
let art: Artplayer
const url =
    'https://upos-sz-mirrorali.bilivideo.com/upgcxcode/33/04/1047710433/1047710433-1-208.mp4?e=ig8euxZM2rNcNbRg7zdVhwdlhWNahwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1680082555&gen=playurlv2&os=alibv&oi=1921313500&trid=4a6e07e7bd294aa387f6f8acebfae8e9T&mid=3493116378089995&platform=html5&upsig=a09a86e6b60f0981ff6ad7d6f123dc08&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&bw=127018&orderid=0,1&logo=80000000'

onMounted(() => {
    const client = props.client
    const roomId = props.roomId
    const usertype = props.usertype

    art = new Artplayer({
        container: '.artplayer-app',
        url: url,
        ...vOptions
    })

    client.on('message', (msg: Message) => {
        switch (msg.type) {
            case 'seek':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.currentTime = msg.message.currentTime
                }
                break
        }
    })

    art.on('video:canplay', () => {
        console.info('video:canplay')
        // art.currentTime = 50
    })

    art.on('restart', () => {
        console.info('video:canplay')
    })

    art.on('pause', () => {
        console.info('pause')
    })

    art.on('play', () => {
        console.info('play')
    })

    art.on('url', (url) => {
        console.info('url', url)
    })

    art.on('seek', (currentTime) => {
        if (usertype == 'owner') {
            console.info('seek', currentTime)
            client.emit('play-control', {
                type: 'seek',
                username: props.username,
                message: {
                    currentTime: currentTime,
                    roomId: roomId
                }
            })
        }
    })
})
</script>

<style>
.artplayer-app {
    height: 800px;
    width: 600px;
}
</style>
