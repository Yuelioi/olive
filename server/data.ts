import type { Room } from './types'

export let Rooms: Room[] = []

export const changeRooms = (newRooms: Room[]) => {
    Rooms = newRooms
}
