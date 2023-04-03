import type { Room, clientId, Video, PlayList } from './types'

class RoomManage {
    rooms: Room[] = []
    constructor(rooms: Room[] = []) {
        this.rooms = rooms
    }

    changeRooms(newRooms: Room[] = []) {
        this.rooms = newRooms
    }

    /**
     * @param currentList 服务器现有房间列表
     * @description 更新服务器现有房间信息
     */
    filterRooms(currentList: string[]) {
        this.rooms = this.rooms.filter((room) => currentList.includes(room.roomId))
    }
    /**
     *
     * @param roomId : 房间Id
     * @returns : 房主名(clientId)
     */
    getRoomOwner(roomId: string): clientId | undefined {
        return this.getRoomById(roomId)?.owner
    }
    getRoomById(roomId: string): Room | undefined {
        return this.rooms.find((room) => room.roomId === roomId)
    }

    addRoom(
        roomId: string,
        roomOwner: string,
        clientIds: string[] = [],
        password: string = '',
        capacity: number = 10
    ): void {
        this.rooms.push({
            roomId: roomId,
            owner: roomOwner,
            clientIds: clientIds,
            password: password,
            capacity: capacity
        })
    }
    removeRoom(roomId: string) {
        const index = roomManage.rooms.findIndex((room) => room.roomId === roomId)
        if (index !== -1) {
            roomManage.rooms.splice(index, 1)
        }
    }

    addUser(room: Room, clientId: clientId) {
        if (!room.clientIds.includes(clientId)) {
            room.clientIds.push(clientId)
        }
    }

    removeUser(room: Room, clientId: clientId) {
        const index = room.clientIds?.findIndex((item) => item === clientId)
        if (!index && index !== -1) {
            room.clientIds?.splice(index, 1)
        }
    }
}

class PlayListManager {
    playlist: PlayList = {
        videos: []
    }
    constructor() {}
    addVideo(video: Video) {
        this.playlist.videos.push(video)
    }

    changeList(newList: Video[]) {
        this.playlist.videos = newList
    }
}

export const roomManage = new RoomManage()
export const playlistManager = new PlayListManager()
