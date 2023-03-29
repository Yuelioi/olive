<template>
    <p>Player</p>
    更换视频<input type="text" :value="video" />
    <button @click="submit_video(usertype)">提交视频</button>
    <div class="artplayer-app"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import Artplayer from 'artplayer'

interface Message {
    type: string
    id?: number
    username: string
    message: any
}
const props = defineProps(['client', 'roomId', 'usertype', 'username', 'vOptions'])
let video = ref('')
let art: Artplayer
const url =
    'https://upos-hz-mirrorakam.akamaized.net/upgcxcode/30/65/942926530/942926530-1-208.mp4?e=ig8euxZM2rNcNbhMhWdVhwdlhzK1hwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1680093570&gen=playurlv2&os=akam&oi=2554734086&trid=713bb8b04fe74e01b8715fb2d9540ccdT&mid=3493143968221616&platform=html5&upsig=0d02af2bc489d635a1361685a12ada68&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&hdnts=exp=1680098690~hmac=a66da324bf08b43006c3d07f4df252d66ab235b8f54677d9381c8df480b9ae43&bvc=vod&nettype=0&bw=341287&orderid=0,1&logo=80000000'

video.value =
    'https://upos-hz-mirrorakam.akamaized.net/upgcxcode/38/12/1053211238/1053211238-1-208.mp4?e=ig8euxZM2rNcNbRHhbdVhwdlhWeghwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1680091783&gen=playurlv2&os=akam&oi=2453177752&trid=d4ac54832efd4ecb90caa621998b0730T&mid=3493143926278740&platform=html5&upsig=672a54f4d06849cd3f43f2a67fcb9ea4&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&hdnts=exp=1680098855~hmac=43e3db448c90d74d74262b4b430b00207e8e84449b191c480d21364756191217&bvc=vod&nettype=0&bw=192486&orderid=0,1&logo=80000000'

const submit_video = (usertype: string) => {
    console.log(art)
    if (usertype == 'owner') {
        art.url = video.value
    }
}

onMounted(() => {
    const client = props.client
    const roomId = props.roomId

    const usertype = props.usertype
    art = new Artplayer({
        container: '.artplayer-app',
        url: url,
        ...props.vOptions
    })

    // 用户进入房间进行同步

    if (usertype == 'user') {
        client.emit('message', {
            type: 'video-sync',
            roomId: roomId,
            username: props.username
        })
    }

    //
    client.on('video-control', (msg: Message) => {
        switch (msg.type) {
            case 'seek':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.currentTime = msg.message.currentTime
                }
                break
            case 'pause':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.pause()
                }
                break
            case 'play':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.play()
                }
                break
            case 'url':
                if (usertype == 'user' && roomId == msg.message.roomId) {
                    art.url = msg.message.url
                }
                break
        }
    })

    art.on('video:canplay', () => {
        console.info('video:canplay')
    })

    art.on('restart', () => {
        console.info('video:canplay')
    })

    art.on('pause', () => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'pause',
                username: props.username,
                message: {
                    roomId: roomId
                }
            })
        }
    })

    art.on('play', () => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'play',
                username: props.username,
                message: {
                    roomId: roomId
                }
            })
        }
    })

    art.on('url', (url: string) => {
        if (usertype == 'owner') {
            client.emit('video-control', {
                type: 'url',
                username: props.username,
                message: {
                    roomId: roomId,
                    url: url
                }
            })
        }
    })

    art.on('seek', (currentTime: number) => {
        if (usertype == 'owner') {
            client.emit('video-control', {
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
