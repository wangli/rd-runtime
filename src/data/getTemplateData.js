import { nanoid } from 'nanoid'

export default function (...override) {
    let time = new Date().getTime()
    let data = {
        id: 'A_' + nanoid(10),
        title: "",
        creattime: time,
        uptime: time,
        cover: "",
        description: "",
        background: { backgroundColor: "#111111" },
        width: 1080,
        height: 768,
        scaleMode: 'auto',
        network: {},
        globalData: [],
        modules: [],
        actions: [],
        plugins: [],
        remote: []
    }
    return Object.assign({}, data, ...override)
}