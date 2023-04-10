import * as Sprites from "./SpritesData"
import * as Groups from "./GroupData"
import * as Modules from "./ModulesData"
import { sprites as spritesSrc, groups as groupsSrc } from './msData'

// 删除元件
export const delElementData = function (id) {
    if (spritesSrc[id]) {
        return Sprites.delSpriteData(id)
    } else if (groupsSrc[id]) {
        if (Array.isArray(groupsSrc[id].components) && groupsSrc[id].components.length > 0) {
            groupsSrc[id].components.forEach(element => {
                delElementData(element.id)
            })
            if (groupsSrc[id].gpid) {
                Groups.delElement(id)
            } else {
                Modules.delElement(id, groupsSrc[id].mid)
            }
        }
        return Groups.delGroupData(id)
    }
}