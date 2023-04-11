import type { Room, clientId, Video } from './types'

/**
 * @description: 房间管理系统
 * @argument
 */
class RoomManage {
    rooms: Room[] = []
    constructor(rooms: Room[] = []) {
        this.rooms = rooms
    }

    /**
     * 替换房间
     * @param newRooms
     */
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

    /**
     * @description 基于clientId 返回房间
     * @param roomId
     * @returns Room
     */
    getRoomById(roomId: string): Room | undefined {
        return this.rooms.find((room) => room.roomId === roomId)
    }

    /**
     * 添加房间
     * @param roomId
     * @param roomOwner
     * @param clientIds
     * @param password
     * @param capacity
     * @param playlist
     */
    addRoom(
        roomId: string,
        roomOwner: string,
        clientIds: string[] = [],
        password: string = '',
        capacity: number = 10,
        playlist: Video[] = []
    ): void {
        this.rooms.push({
            roomId: roomId,
            owner: roomOwner,
            clientIds: clientIds,
            password: password,
            capacity: capacity,
            playlist: playlist
        })
    }

    /**
     * 移除房间
     * @param roomId
     */
    removeRoom(roomId: string) {
        const index = roomManage.rooms.findIndex((room) => room.roomId === roomId)
        if (index !== -1) {
            roomManage.rooms.splice(index, 1)
        }
    }

    /**
     * 向房间添加用户
     * @param room
     * @param clientId
     */
    addUser(room: Room, clientId: clientId) {
        if (!room.clientIds.includes(clientId)) {
            room.clientIds.push(clientId)
        }
    }

    /**
     * 移除当前房间的用户
     * @param room
     * @param clientId
     */
    removeUser(room: Room, clientId: clientId) {
        const index = room.clientIds?.findIndex((item) => item === clientId)
        if (!index && index !== -1) {
            room.clientIds?.splice(index, 1)
        }
    }

    /**
     * 获取房间播放列表
     * @param roomId
     * @returns
     */
    getPlaylist(roomId: string): Video[] | undefined {
        return this.rooms.find((room) => room.roomId === roomId)?.playlist
    }

    updatePlaylist(roomId: string, playlist: Video[]): void {
        this.rooms.find((room) => room.roomId === roomId)!.playlist = playlist
    }
}

export const roomManage = new RoomManage()
