import type { Video } from '@/types/client'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('userPlayer', () => {
    const videos = ref<Video[]>([])
    const addVideo = (video: Video) => {
        console.log(video)
        videos.value.push(video)
    }
    const updateVideos = (newList: Video[]) => {
        videos.value = newList
    }
    return {
        videos,
        addVideo,
        updateVideos
    }
})
