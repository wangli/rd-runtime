import Module from './coms/Module'
import Plane from './coms/Plane'
import Popwin from './coms/Popwin'
import Content from './coms/Content'
import ContentFixed from './coms/ContentFixed'
import Overlayer from './coms/Overlayer'
import Message from './coms/Message'
import Mask from './coms/Mask'
import Background from './coms/Background'
import SpriteGroup from './coms/SpriteGroup'
import SpriteObject from './coms/SpriteObject'

/**
 * 舞台内容的组成部分
 * 包括
 * state 舞台
 * background 舞台背景
 * content 舞台基本内容
 * module 组件分组模块
 * overlayer 舞台模块弹窗内容
 * popwin 用户弹窗
 * mask 弹层下的透明黑遮罩层
 * message 消息窗口
 */

const coms = [Module, Plane, Popwin, Overlayer, Content, ContentFixed, Message, Mask, Background, SpriteGroup, SpriteObject]

export default {
   install: (app) => {
      coms.forEach(item => {
         app.component(item.name, item)
      })
   }
}