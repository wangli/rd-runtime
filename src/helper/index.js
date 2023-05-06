import * as element from './element'
import * as event from './event'
import * as action from './action'
import * as other from './other'
import { jsonData, extractData } from '@/utils'


class Helper {
   app = null
   appData = null
   constructor(app) {
      this.app = app
      this.appData = app.data
   }
   jsonData() {
      return jsonData.call(this, ...arguments)
   }
   extractData() {
      return extractData.call(this, ...arguments)
   }
   setZindex() {
      return element.setZindex.call(this, ...arguments)
   }
   copy() {
      return element.copy.call(this, ...arguments)
   }
   copyAdd() {
      return element.copyAdd.call(this, ...arguments)
   }
   changeModuleShow() {
      return element.changeModuleShow.call(this, ...arguments)
   }
   newEventData() {
      return event.newEventData.call(this, ...arguments)
   }
   getEvent() {
      return event.getEvent.call(this, ...arguments)
   }
   addEvent() {
      return event.addEvent.call(this, ...arguments)
   }
   editEvent() {
      return event.editEvent.call(this, ...arguments)
   }
   removeEvent() {
      return event.removeEvent.call(this, ...arguments)
   }
   addEventAction() {
      return action.addEventAction.call(this, ...arguments)
   }
   editEventAction() {
      return action.editEventAction.call(this, ...arguments)
   }
   removeEventAction() {
      return action.removeEventAction.call(this, ...arguments)
   }
   getSpriteActions() {
      return action.getSpriteActions.call(this, ...arguments)
   }
   getBodyData() {
      return other.getBodyData.call(this, ...arguments)
   }
}

export default Helper