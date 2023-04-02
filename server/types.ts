export type Room = {
    roomId: string
    owner: string
    clientIds: string[]
    password: string | null
    capacity: number
}
