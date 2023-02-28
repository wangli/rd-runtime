/**
 * 事件名称处理
 */

class Events {
    constructor() {}
    // 添加单个的事件名
    add(key, name) {
        let keys = Object.keys(this);
        if (keys.find(n => n == key)) {
            throw key + '已存在'
        } else {
            this[key] = name;
        }
    }
    /**
     * 扩展对象，过滤自身方法
     * @param {object} obj 
     */
    ext(obj) {
        if (typeof obj == 'object') {
            for (var key in obj) {
                if (['ext', 'add'].find(n => n == key)) {
                    console.warn('事件名称 [' + key + '] 不可以使用')
                    delete obj[key]
                }
            }
            for (var key in obj) {
                this[key] = {};
                for (var k in obj[key]) {
                    this[key][k] = key + '.' + obj[key][k]
                }
            }
        }
    }
}
const events = new Events();

export default events;