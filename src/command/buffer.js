/**
 * 发送相同事件名间隔时间缓冲判断
 */
const eventNames = {}
const interval = 10;
let sprid = null
export default function (name, args) {
    // 过滤发送的事件命令，发送间隔低于10毫秒的不通过
    var ispass = true
    var time = new Date().getTime()
    if (eventNames[name]) {
        if (time - eventNames[name].time < interval) ispass = false
        eventNames[name].count++
        eventNames[name].time = time
    } else {
        eventNames[name] = {
            count: 1,
            time: time
        }
    }
    if (ispass) {
        sprid = null
    } else if (name == 'action') {
        if (args && args.sprid != sprid) {
            ispass = true
            sprid = args.sprid
        }
    }
    return ispass
}