import { jsonData } from '@/utils'

/**
 * 绑定data上的方法
 * 复制元件并添加
 * @param {*} sid 需要复制的数据id
 * @param {*} option 数据覆盖
 * @param {*} gpid 所在组id
 */
export const copyAdd = function (sid, option, gpid = null) {
    let sprites = this.mData.sprites
    let groups = this.mData.groups
    // 所有舞台元件
    const spritesData = sprites.getSpritesData()
    const groupsData = groups.getGroups()
    if (spritesData[sid]) {
        let sprData = jsonData(spritesData[sid])
        sprData.title += "_c"
        delete sprData.id
        delete sprData.zIndex
        Object.assign(sprData, option)
        return sprites.addSpriteData(sprData, sprData.mid, gpid)
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
        let newGroup = groups.newGroupData(element, element.mid)
        groupComponents.forEach(sprite => {
            this.copyAdd(sprite.id, { gpid: newGroup.id }, newGroup.id)
        })
        return newGroup
    }
}
