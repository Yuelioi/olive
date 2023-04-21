/**
 * 一个房间
 */
export type Room = {
    roomId: string
    owner: string
    sessionIds: string[]
    password: string | null
    capacity: number
    playlist: Video[]
}

/**
 * 播放列表
 */
export type PlayList = {
    sessionId?: sessionId
    videos: Video[]
}

/**
 * 视频
 */
export type Video = {
    title: String
    url: String
}

/**
 * client ID
 */
export type sessionId = string
