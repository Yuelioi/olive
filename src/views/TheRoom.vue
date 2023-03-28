<template>
    <section>
        <div>
            <h2>房间 {{ roomId }}</h2>
            <input type="text" :video="video" />
            <button @click="submit_video">提交视频</button>
            <video-player
                ref="pano"
                src="https://upos-sz-mirrorali.bilivideo.com/upgcxcode/91/21/974102191/974102191-1-208.mp4?e=ig8euxZM2rNcNbhMhWdVhwdlhzK1hwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1680034541&gen=playurlv2&os=alibv&oi=1921313500&trid=26c8d3e7a2884e52a0f341aeee915134T&mid=3493116378089474&platform=html5&upsig=2ee737f7b8066134713f060170e328e2&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&bw=341271&orderid=0,1&logo=80000000"
                controls
                :loop="true"
                :volume="0.6"
            />
            <RouterView :client="client" />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { io } from 'socket.io-client'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import 'video.js/dist/video-js.css'
import { VideoPlayer } from '@videojs-player/vue'
const route = useRoute()
const roomId = route.params.roomId
// const client = io(`localhost:8080/${roomId}`)
const client = io(`localhost:8080`)
const video = ref('')
const submit_video = () => {}
const pano = ref(VideoPlayer)
// pano.value.src = '1.mp4'
console.log(pano)
console.log(pano.value)

onMounted(() => {
    client.on('connect', () => {
        console.log('Room Connected!')
    })
})

onBeforeUnmount(() => {
    client.close()
})
</script>
