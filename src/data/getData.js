import { jsonData } from '@/utils'


export default function (app) {
    const appData = app.getAppData()
    const mData = app.mData
    const gData = app.gData
    const aData = app.aData
    const eData = app.eData
    const rData = app.rData
    const pData = app.pData

    let modules = jsonData(mData.getModuleList())
    modules.forEach(module => {
        if (module.components && Array.isArray(module.components)) {
            module.components = module.components.map(element => {
                if (element.type == 'group') {
                    let groupData = mData.getGroup(element.id)
                    if (groupData.components) {
                        groupData.components = groupData.components.map(sprite => {
                            let sprData = mData.getSprite(sprite.id)
                            sprData.selected = false
                            return sprData
                        })
                    }
                    groupData.selected = false
                    return groupData
                } else {
                    let sprData = mData.getSprite(element.id)
                    sprData.selected = false
                    return sprData
                }
            })
        }
    })

    let globalData = jsonData(gData.getGDataList())
    globalData.forEach((element, index) => {
        if (element.type == 'temp') {
            globalData.splice(index, 1)
        }
        let trigger = element.trigger
        if (!trigger || (trigger && (!trigger.operator || !trigger.action))) {
            element.trigger = null
        }
    })
    return jsonData({
        ...appData.info,
        globalData,
        modules,
        actions: aData.getActionList(),
        events: eData.getGAction(),
        plugins: pData.getPluginList(),
        remote: rData.getRemoteList()
    })
}