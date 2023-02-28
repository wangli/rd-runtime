import { reactive, shallowReactive, watch } from "vue"
import { jsonData } from "../../utils"

export const spritesProps = shallowReactive({})


const updata = function (newData) {
   if (spritesProps[newData.id]) {
      Object.assign(spritesProps[newData.id], newData)
   }
}

export const add = function (newData) {
   watch(newData, updata)
   let initProps = jsonData(newData)
   initProps['key'] = newData.id
   // // 删除组件定义相关信息
   if (initProps['name']) delete initProps['name']
   if (initProps['mid']) delete initProps['mid']
   spritesProps[newData.id] = reactive(jsonData(initProps))
}

export const getSpriteProps = function (id) {
   return spritesProps[id]
}