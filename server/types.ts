export type Room = {
    roomId: string
    owner: string
    clientIds: string[]
    password: string | null
    capacity: number
    playlist: Video[]
}

export type PlayList = {
    clientId?: clientId
    videos: Video[]
}

export type Video = {
    title: String
    url: String
}

export type clientId = string
