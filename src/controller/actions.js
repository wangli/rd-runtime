/**
 * 动作处理
 */

export const initActions = function () {
   return {
      // 更新元素原始数据
      reviewData(target, data) {
         if (data && data.id) {
            console.warn(data.id + '不能替换')
            return
         }
         Object.assign(target, data)
      },
      // 显示元素
      show(target, value) {
         if (!target) return
         if (Array.isArray(target)) {
            target.forEach(element => {
               element.visible = value
            })
         } else {
            target.visible = value
         }
      },
      // 切换显示
      toggle(target) {
         if (!target) return
         if (Array.isArray(target)) {
            target.forEach(element => {
               element.visible = !element.visible
            })
         } else {
            target.visible = !target.visible
         }
      },
      // 更新元素传递数据
      sendData(target, value) {
         if (!target) return
         if (Array.isArray(target)) {
            target.forEach(element => {
               element.data = value
            })
         } else {
            target.data = value
         }
      },
      // 链接跳转
      href(url, target = "_blank") {
         if (!url) return;
         if (target == 'a') {
            window.location.href = url;
         } else {
            window.open(url, target);
         }
      },
      // 模块切换显示
      singleModule(modules, mid) {
         modules.filter(item => item.type == 'content').forEach(element => {
            if (element.id == mid) {
               element.visible = true
            } else {
               element.visible = false
            }
         })
      },
      // 开关弹窗页面
      popup(module, value) {
         if (module && module.type == 'overlayer') {
            if (typeof value == 'boolean') {
               module.visible = value
            } else {
               module.visible = !module.visible
            }
         }
         return module
      }
   }
}