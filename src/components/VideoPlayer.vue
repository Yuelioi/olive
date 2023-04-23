<template>
    <p>Player</p>
    标题<input type="text" v-model="title" /> 更换视频<input type="text" v-model="video" />

    <button @click="submit_video(usertype)">提交视频</button>
    <div class="artplayer-app"></div>
    <div class="right-container">
        <div class="video-sections-content-list">
            <ul>
                <li v-for="(item, index) in videos" :key="index">
                    {{ item.title + '|' + item.url }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Artplayer from 'artplayer'

import { registerVideoClient } from '@/clients/video'
import { usePlayerStore } from '@/stores/player'
import { useStatusStore } from '@/stores/userstatus'

import { EventTypes } from '@/configs/event'
import { vOptions } from '@/configs/config'

import { registerPlayerController } from '../player/playerControl'

const { videos } = storeToRefs(usePlayerStore())
const { addVideo } = usePlayerStore()

const store = useStatusStore()
const { roomId, usertype, client, username } = storeToRefs(store)
const video = ref('')
const title = ref('')

let art: Artplayer

const submit_video = (usertype: string) => {
    addVideo({ title: title.value, url: video.value })

    if (usertype == 'owner') {
        art.url = video.value
        // art.url =
        //     'https://cn-gddg-ct-01-22.bilivideo.com/upgcxcode/42/70/1081807042/1081807042-1-208.mp4?e=ig8euxZM2rNcNbhMhzdVhwdlhzKzhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1680610666&gen=playurlv2&os=bcache&oi=1921313500&trid=00000d789a6d115d44e8a2369dc1cc827616T&mid=3493116380187461&platform=html5&upsig=544ac1b14abbe60aeec7581867fb00a6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&cdnid=61322&bvc=vod&nettype=0&bw=343391&orderid=0,1&logo=80000000'
    }
}

onMounted(() => {
    art = new Artplayer({
        container: '.artplayer-app',
        url: 'https://cdn.yuelili.com/20230404011433.mp4',
        ...vOptions,
        // plugins: [artplayerPlaylist(art)]

        icons: {
            loading: `<img src="https://web-1300893378.cos.ap-shanghai.myqcloud.com/olive/assets/imgs/ploading.gif ">`,
            state: `<img width="150" heigth="150" src="https://web-1300893378.cos.ap-shanghai.myqcloud.com/olive/assets/imgs/state.svg">`,
            indicator: `<img width="16" heigth="16" src="https://web-1300893378.cos.ap-shanghai.myqcloud.com/olive/assets/imgs/indicator.svg">`
        }
    })

    registerVideoClient(client.value, art)
    registerPlayerController(art)

    // 用户进入房间进行同步

    if (usertype.value == 'user') {
        client.value.emit(EventTypes.VIDEO.NAME, {
            type: EventTypes.VIDEO.SYNC,
            roomId: roomId.value,
            username: username.value,
            data: {}
        })
    }

    //
})
</script>

<style>
.artplayer-app {
    height: 800px;
    width: 1200px;
}
</style>
