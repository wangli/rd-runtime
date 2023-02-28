import { modules } from '../data/SprData/msData'

export const createSimpleData = function (data) {
   let object = {
      id: null,
      gpid: null,
      mid: null,
      visible: null,
      name: null,
      type: null,
      zIndex: null
   }
   for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
         object[key] = data[key] || null
      }
   }
   return object
}

export const getMaxZIndex = function (mid) {

   if (modules[mid]['components'] && modules[mid]['components'].length > 0) {
      let comps = modules[mid]['components'].map(item => {
         return {
            id: item.id,
            zIndex: item.zIndex
         }
      }).sort((a, b) => {
         return b.zIndex - a.zIndex
      })
      return comps[0].zIndex || 0
   } else {
      return 0
   }
}