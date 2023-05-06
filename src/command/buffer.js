/**
 * 发送相同事件名间隔时间缓冲判断
 */
const eventNames = {}
const interval = 10;
export default function (name) {
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
    return ispass
}