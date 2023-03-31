export interface Message {
    type: string
    id?: number
    username: string
    message: any
}

export enum MessageType {
    SYSTEM = 'system',
    MESSAGE = 'message',
    ROOM = 'room'
}
