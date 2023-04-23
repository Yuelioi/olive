import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/userstatus'

const store = useStatusStore()
store.userInfoInit()
const { username, roomId, usertype, password, joinPassword } = storeToRefs(store)
export const createRoom = (router: any) => {
    // 生成随机的房间ID

    roomId.value = Math.random().toString(36).substring(2, 8)
    console.log('创建房间中')

    // 跳转到新生成的房间页面
    router.push({
        name: `Room`,
        params: {
            roomId: roomId.value
        }
    })

    localStorage.setItem('roomId', roomId.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('usertype', usertype.value)
    localStorage.setItem('password', password.value)
}
export const joinRoom = (router: any, curRoomId: string = '') => {
    usertype.value = 'user'

    if (curRoomId) {
        roomId.value = curRoomId
    }

    if (roomId.value) {
        // 跳转到指定的房间页面
        router.push({
            name: `Room`,
            params: {
                roomId: roomId.value
            }
        })
    }
    localStorage.setItem('roomId', roomId.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('usertype', usertype.value)
    localStorage.setItem('joinPassword', joinPassword.value)
}
