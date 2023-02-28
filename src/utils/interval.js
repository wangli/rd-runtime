import { nanoid } from 'nanoid'

let ids = {}
/**
 * 定时器
 */
export default {
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