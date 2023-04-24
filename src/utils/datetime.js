import { nanoid } from 'nanoid'

// 生成唯一序号
export const guid = function () {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

// 定时器
let ids = {}
export const interval = {
    add(_fun, _time = 1000, _id) {
        let id = _id || "it_" + nanoid(7)
        if (ids[id]) {
            clearInterval(ids[id])
        }
        ids[id] = setInterval(_fun, _time);
        return id;
    },
    del(_id) {
        if (_id) {
            if (ids[_id]) {
                clearInterval(ids[_id])
                delete ids[_id]
            }
        } else {
            for (const key in ids) {
                clearInterval(ids[key])
            }
            ids = {}
        }
    }
}

// 延时处理
let idos = {}
export const timeout = {
    add(_fun, _time, _id) {
        let time = _time || 1000
        let id = _id || "id_" + new Date().getTime() + "" + Math.floor(Math.random() * 1000);
        if (idos[id]) {
            clearTimeout(idos[id])
        }
        idos[id] = setTimeout(_fun, time);
        return id;
    },
    del(_id) {
        if (_id) {
            if (idos[_id]) {
                clearTimeout(idos[_id])
                delete idos[_id]
            }
        } else {
            for (const key in idos) {
                if (Object.hasOwnProperty.call(idos, key)) {
                    clearTimeout(idos[key])
                }
            }
            idos = {}
        }
    }
}
