import { jsonData } from '@/utils'

/**
 * 调整元素层级
 * @param {string}} spid 
 * @param {string} level 
 */
export const setZindex = function (spid, level = 'up') {
    const { mData } = this.appData
    // 所有舞台元素
    const elements = mData.elements
    // 获取元素的数据对象
    const sprite = mData.getElement(spid)
    if (!sprite) {
        console.warn('元素不存在' + spid)
        return
    } else if (!sprite.mid) {
        console.warn('页面上找不到' + spid)
        return
    }
    // 获取所有元素的zIndex排序
    let sprs = mData.getMyElements(sprite.mid).map(item => {
        return {
            id: item.id,
            zIndex: item.zIndex
        }
    }).sort((a, b) => {
        return b.zIndex - a.zIndex
    })
    if (level == 'up') {
        // 层级向上
        let index = sprs.findIndex(n => n.id == spid)
        if (index > 0) {
            let upId = sprs[index - 1].id
            let upzIndex = elements[upId].zIndex
            elements[upId].zIndex = elements[spid].zIndex
            elements[spid].zIndex = upzIndex

        }
    } else if (level == 'down') {
        // 层级向下
        let index = sprs.findIndex(n => n.id == spid)
        if (index < sprs.length - 1 && index > -1) {
            let upId = sprs[index + 1].id
            let upzIndex = elements[upId].zIndex
            elements[upId].zIndex = elements[spid].zIndex
            elements[spid].zIndex = upzIndex

        }
    } else if (level == 'top') {
        // 层级置顶
        let index = sprs.findIndex(n => n.id == spid)
        if (index > 0) {
            elements[spid].zIndex = sprs[0].zIndex
            for (let i = 0; i < index; i++) {
                elements[sprs[i].id].zIndex--
            }
        }
    } else if (level == 'bottom') {
        // 层级最底
        let index = sprs.findIndex(n => n.id == spid)
        if (index < sprs.length - 1 && index > -1) {
            elements[spid].zIndex = sprs[sprs.length - 1].zIndex
            for (let i = index + 1, lg = sprs.length; i < lg; i++) {
                elements[sprs[i].id].zIndex++
            }
        }
    }
}
/**
 * 复制元素并添加
 * @param {*} sid 需要复制的数据id
 * @param {*} option 数据覆盖
 * @param {*} gpid 所在组id
 */
export const copyAdd = function (sid, option, gpid = null) {
    const { mData } = this.appData
    // 所有舞台元素
    const spritesData = mData.getSprites()
    const groupsData = mData.getGroups()
    if (spritesData[sid]) {
        let sprData = jsonData(spritesData[sid])
        sprData.title += "_c"
        delete sprData.id
        delete sprData.zIndex
        Object.assign(sprData, option)
        return mData.addSprite(sprData, sprData.mid, gpid)
    } else if (groupsData[sid]) {
        let element = jsonData(groupsData[sid])
        element.title += "_c"
        delete element.id
        delete element.zIndex
        Object.assign(element, option)
        // 组合处理
        let groupComponents = []
        if (element.components) {
            groupComponents = element.components
            delete element.components
        }
        let newGroup = mData.newGroup(element, element.mid)
        groupComponents.forEach(sprite => {
            this.copyAdd(sprite.id, { gpid: newGroup.id }, newGroup.id)
        })
        return newGroup
    }
}

/**
 * 复制元素数据
 * @param {*} id 需要复制的数据id
 * @param {*} clear 是否清除事件与数据
 */
export const copy = function (id, clear) {
    const { mData } = this.appData
    // 所有舞台元素
    const spritesData = mData.getSprites()
    const groupsData = mData.getGroups()
    if (spritesData[id]) {
        let sprData = jsonData(spritesData[id])
        sprData.title += "_c"
        if (clear) {
            // 清除关联信息
            delete sprData.id
            delete sprData.gpid
            delete sprData.mid
            delete sprData.zIndex
            delete sprData.lock
            delete sprData.bind
            if (typeof sprData.data == 'string' && (/(^GD_\S{10})|(^GD_query)|(^RD_\S{10})$/.test(sprData.data))) {
                sprData.data = ''
            }
            sprData.events = []
        }
        return sprData
    } else if (groupsData[id]) {
        let element = jsonData(groupsData[id])
        element.title += "_c"
        if (clear) {
            delete element.id
            delete element.gpid
            delete element.mid
            delete element.zIndex
        }
        // 处理子元素
        if (Array.isArray(element.components)) {
            element.components = element.components.map(item => {
                return this.copy(item.id, clear)
            })
        }
        return element
    }
}


/**
 * 切换模块
 * @param {*} id 需要显示的模块id
 * @param {*} ids 跳过不处理的id数组
 */
export const changeModuleShow = function (id, ids) {
    const { mData } = this.appData
    mData.getModuleList().forEach(element => {
        if (ids) {
            if (typeof ids == 'string') {
                if (element.id == ids) return
            } else if (ids instanceof Array) {
                if (ids.find(myid => myid == element.id)) return
            }
        }
        if (element.type != 'fixed') {
            if (element.id == id) {
                element.visible = true
            } else {
                element.visible = false
            }
        }
    });
}