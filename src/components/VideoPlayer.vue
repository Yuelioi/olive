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
import { ref } from 'vue'
import { onMounted } from 'vue'
import Artplayer from 'artplayer'

import { registerPlayerClient } from '@/clients/vplayer'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { vOptions } from '@/configs/data'
import { useStatusStore } from '@/stores/userstatus'
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

    registerPlayerClient(client.value, art)

    // 用户进入房间进行同步

    if (usertype.value == 'user') {
        client.value.emit('message', {
            type: 'video-sync',
            roomId: roomId,
            username: username.value
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
