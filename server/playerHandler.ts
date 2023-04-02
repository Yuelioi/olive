export default (io, socket) => {
    const onVideoSync = (message) => {
        // console.log('Received VideoSync:', message)
        io.emit('message', message)
    }

    const onVideoControl = (message) => {
        io.emit('message', message)
    }

    socket.on('video-sync', onVideoSync)
    socket.on('video-control', onVideoControl)
}
