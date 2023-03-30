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
import { registerPlayerClient } from '../clients/vplayer'

const props = defineProps(['client', 'roomId', 'usertype', 'username', 'vOptions'])
let video = ref('')
let art: Artplayer

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
        url: '',
        ...props.vOptions
    })

    registerPlayerClient(client, art, props)

    // 用户进入房间进行同步

    if (usertype == 'user') {
        client.emit('message', {
            type: 'video-sync',
            roomId: roomId,
            username: props.username
        })
    }

    //
})
</script>

<style>
.artplayer-app {
    height: 800px;
    width: 600px;
}
</style>
