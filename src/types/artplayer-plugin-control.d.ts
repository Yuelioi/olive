import type Artplayer from 'artplayer'

type Option = {}

type Control = {
    name: 'artplayerPluginControl'
    enable: boolean
}

const artplayerPluginControl: (option?: Option) => (art: Artplayer) => Control =
    (option?: Option) => (art: Artplayer) => ({
        name: 'artplayerPluginControl',
        enable: true
    })

export default artplayerPluginControl
