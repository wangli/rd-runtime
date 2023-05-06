const list = {}

export default {
   add(val) {
      if (val.id) {
         list[val.id] = val
      }
   },
   del(val) {
      if (val.id) {
         delete list[val.id]
      }
   },
   get items() {
      return list
   }
}